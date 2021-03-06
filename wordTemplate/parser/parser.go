package parser

import (
	"bytes"
	"fmt"
	"io"
	"regexp"
	"strconv"

	"github.com/unidoc/unioffice/document"
	"github.com/unidoc/unioffice/measurement"
	"github.com/unidoc/unioffice/schema/soo/wml"
	"golang.org/x/net/html"
)

func parse(tokenizer *html.Tokenizer, ancestorState *parserState) (io.Reader, error) {
	if ancestorState == nil || tokenizer == nil {
		return nil, fmt.Errorf("tokenizer or ancestorState is uninitalized")
	}
	globalConsts := GlobalConsts{h1: 16, h2: 15, h3: 14, h4: 13, h5: 12, h6: 11}
	currentState := ancestorState
	numberingLevel := -1
	doc := document.New()
	isDone := false
	for !isDone {
		tokenType := tokenizer.Next()
		switch tokenType {
		case html.ErrorToken:
			err := tokenizer.Err()
			if err == io.EOF {
				isDone = true
				break
			}
			return nil, fmt.Errorf("error tokenizing html: %v", tokenizer.Err())
		case html.StartTagToken:
			tn, hasAttrib := tokenizer.TagName()
			tnameStr := string(tn)
			if tname, ok := WhiteListTags[tnameStr]; ok {
				switch tname {
				case Global:
					currentState = NewParserState(currentState, tname)
					currentState.section = tname
				case Document:
					currentState = NewParserState(currentState, tname)
					currentState.section = tname
				case Body:
					currentState = NewParserState(currentState, tname)
					currentState.section = tname
					nd := doc.Numbering.AddDefinition()
					currentState.numDef = &nd
				case OrderedList, UnorderedList:
					numberingLevel++
					currentState = NewParserState(currentState, tname)
					currentState.section = tname
					level := 0
					if currentState.currentList != nil {
						level = currentState.currentList.level + 1
					}
					newList := ListProps{}
					newList.level = level
					newList.numDefLevel = numberingLevel
					currentState.currentList = &newList
					var attribs map[string]string
					if hasAttrib {
						attribs = getAttributes(tokenizer)
					}
					switch tname {
					case OrderedList:
						currentState.setupOrderedList(attribs)
					case UnorderedList:
						currentState.setupUnorderedList(attribs)
					}
				case Table:
					currentState = NewParserState(currentState, tname)
					currentState.section = tname
					currentState.currentTable = &TableProps{}
					currentState.currentTable.spans = make([]*RowSpan, 0)
					currTblProps := currentState.currentTable
					tbl := doc.AddTable()
					currTblProps.tbl = &tbl
					currTblProps.currentRow = -1
					attribs := getAttributes(tokenizer)
					currentState.setTableProps(attribs)
				default:
					if currentState.section == Table {
						currentState = NewParserState(currentState, tname)
						currentState.section = tname
						switch tname {
						case TableBorder:
							currentState.currentTable.tbl.
								Properties().X().TblBorders = wml.NewCT_TblBorders()
						case TableRow:
							row := currentState.currentTable.tbl.AddRow()
							rowProps := TableRowProps{}
							currentState.currentTable.currentRowProps = &rowProps
							rowProps.currentRow = &row
							currentState.currentTable.currentRow = currentState.currentTable.currentRow + 1
							currentState.currentTable.currentCol = -1
						}
					} else if currentState.section == TableRow {
						switch tname {
						case TableData:
							var attribs map[string]string
							if hasAttrib {
								attribs = getAttributes(tokenizer)
							}
							currentState = NewParserState(currentState, tname)
							currentState.section = tname
							currentState.currentTable.currentCol = currentState.currentTable.currentCol + 1
							rowProps := currentState.currentTable.currentRowProps
							cell := rowProps.currentRow.AddCell()
							para := cell.AddParagraph()
							run := para.AddRun()
							currentState.currentPara = &para
							currentState.currentRun = &run
							currentState.setTableCellProps(&cell, attribs)
						}
					} else if currentState.section == Document {
						switch tname {
						case PageHeader:
							hdr := doc.AddHeader()
							doc.BodySection().SetHeader(hdr, wml.ST_HdrFtrDefault)
							hdrPara := hdr.AddParagraph()
							currentState = NewParserState(currentState, tname)
							currentState.currentPara = &hdrPara
							currentState.section = PageHeader
							currentState.setHeaderFooterParagraphPropsPstyle("Header")
						case PageFooter:
							ftr := doc.AddFooter()
							doc.BodySection().SetFooter(ftr, wml.ST_HdrFtrDefault)
							ftrPara := ftr.AddParagraph()
							currentState = NewParserState(currentState, tname)
							currentState.currentPara = &ftrPara
							currentState.section = PageFooter
							currentState.setHeaderFooterParagraphPropsPstyle("Footer")
						case DocProps:
							currentState = NewParserState(currentState, tname)
							currentState.section = tname
						case DocPageBorder:
							currentState = NewParserState(currentState, tname)
							currentState.section = DocPageBorder
							doc.BodySection().X().PgBorders = wml.NewCT_PageBorders()
							if hasAttrib {
								attribs := getAttributes(tokenizer)
								setDocBorderProps(doc, attribs)
							}
						}
					} else if currentState.section == PageHeader || currentState.section == PageFooter {
						switch tname {
						case Center, Left, Right:
							currentState = NewParserState(currentState, tname)
							run := currentState.currentPara.AddRun()
							currentState.currentRun = &run
							switch tname {
							case Left:
								currentState.setAlignmentTab(wml.ST_PTabRelativeToMargin, wml.ST_PTabLeaderNone, wml.ST_PTabAlignmentLeft)
							case Center:
								currentState.setAlignmentTab(wml.ST_PTabRelativeToMargin, wml.ST_PTabLeaderNone, wml.ST_PTabAlignmentCenter)
							case Right:
								currentState.setAlignmentTab(wml.ST_PTabRelativeToMargin, wml.ST_PTabLeaderNone, wml.ST_PTabAlignmentRight)
							}
						}
					} else if currentState.section == DocProps {
						switch tname {
						case Title, Author, Description,
							Category, Version, Application, Company:
							currentState = NewParserState(currentState, tname)
						}
					} else if currentState.section == Body || currentState.section == ListItem {
						currentState = NewParserState(currentState, tname)
						currentState.section = tname
						switch tname {
						case Paragraph:
							para := doc.AddParagraph()
							currentState.currentPara = &para
							var attribs map[string]string
							if hasAttrib {
								attribs = getAttributes(tokenizer)
								currentState.setParaProps(attribs)
							}
							if currentState.section == ListItem {
								para.Properties().SetStartIndent(measurement.Distance(int64(currentState.currentList.level * currentState.currentList.indentDelta)))

							}
						case Heading1:
							if currentState.currentPara != nil {
								currentState.currentPara.SetStyle("Heading1")
							}
						case Heading2:
							if currentState.currentPara != nil {
								currentState.currentPara.SetStyle("Heading2")
							}
						case Heading3:
							if currentState.currentPara != nil {
								currentState.currentPara.SetStyle("Heading3")
							}
						case Heading4:
							if currentState.currentPara != nil {
								currentState.currentPara.SetStyle("Heading4")
							}
						case Heading5:
							if currentState.currentPara != nil {
								currentState.currentPara.SetStyle("Heading5")
							}
						case Heading6:
							if currentState.currentPara != nil {
								currentState.currentPara.SetStyle("Heading6")
							}
						}
					} else if currentState.section == Paragraph {
						switch tname {
						case ParagraphBorder:
							currentState = NewParserState(currentState, tname)
							currentState.section = ParagraphBorder
							currentState.currentPara.Properties().X().PBdr = wml.NewCT_PBdr()
						}
					} else if currentState.section == UnorderedList || currentState.section == OrderedList {
						switch tname {
						case ListItem:
							currentState = NewParserState(currentState, tname)
							currentState.section = tname
							para := doc.AddParagraph()
							//para.Properties().SetStartIndent(measurement.Distance(int64(currentState.currentList.level * currentState.currentList.indentDelta)))
							currentState.currentPara = &para
							run := para.AddRun()
							currentState.currentRun = &run
							nd := *currentState.numDef
							para.SetNumberingDefinition(nd)
							para.SetNumberingLevel(currentState.currentList.numDefLevel)
						}
					}
				}
			} else if tname, ok := WhiteListStyleTags[tnameStr]; ok {
				var attribs map[string]string
				if hasAttrib {
					attribs = getAttributes(tokenizer)
				}
				switch tname {
				case Bold, Italic, Caps, SmallCaps,
					StrikeThrough, DoubleStrikeThrough, Outline,
					Shadow, Emboss, Imprint, NoProof,
					SnapToGrid, Vanish, WebHidden, RightToLeft,
					SubScript, SuperScript:
					currentState.currentTextStyle.flags = currentState.currentTextStyle.flags ^ tname
				case Underline:
					currentState.setUnderline(attribs)
				case Emphasis:
					currentState.setEmphasis(attribs)
				case Font:
					currentState.setFontStyles(attribs)
				case TextHighlight:
					currentState.setTextHighlight(attribs)
				case TextEffect:
					currentState.setTextEffect(attribs)
				case TextBorder:
					currentState.setTextBorders(attribs)
				case TextShading:
					currentState.setTextShading(attribs)
				}
			}
		case html.EndTagToken:
			tn, _ := tokenizer.TagName()
			tnameStr := string(tn)
			if tname, ok := WhiteListStyleTags[tnameStr]; ok {
				switch tname {
				case Bold, Italic, Caps, SmallCaps,
					StrikeThrough, DoubleStrikeThrough, Outline,
					Shadow, Emboss, Imprint, NoProof,
					SnapToGrid, Vanish, WebHidden, RightToLeft,
					SubScript, SuperScript:
					currentState.currentTextStyle.flags = currentState.currentTextStyle.flags ^ tname
				case Underline:
					currentState.currentTextStyle.underline = nil
				case Emphasis:
					currentState.currentTextStyle.emphasisStyle = wml.ST_EmUnset
				case Font:
					currentState.currentTextStyle.font = nil
				case TextHighlight:
					currentState.currentTextStyle.textHighlight = wml.ST_HighlightColorUnset
				case TextEffect:
					currentState.currentTextStyle.textEffect = wml.ST_TextEffectUnset
				case TextBorder:
					currentState.currentTextStyle.textBorder = nil
				case TextShading:
					currentState.currentTextStyle.textshading = nil
				}
			} else if _, ok := WhiteListTags[tnameStr]; ok {
				currentState = currentState.prev
			}
		case html.SelfClosingTagToken:
			tn, hasAttrib := tokenizer.TagName()
			tnameStr := string(tn)
			if tname, ok := WhiteListSelfTags[tnameStr]; ok {
				var attribs map[string]string
				if hasAttrib {
					attribs = getAttributes(tokenizer)
				}
				switch tname {
				case FieldCurrentPage:
					run := currentState.currentPara.AddRun()
					applyTextFormattingToRun(currentState, &run)
					run.AddField(document.FieldCurrentPage)

				case FieldNumberofPages:
					run := currentState.currentPara.AddRun()
					applyTextFormattingToRun(currentState, &run)
					run.AddField(document.FieldNumberOfPages)
				case FieldTableOfContents:
					doc.AddParagraph().AddRun().AddField(document.FieldTOC)
				case PageBreak:
					para := doc.AddParagraph()
					run := para.AddRun()
					run.AddPageBreak()
					currentState.currentPara = &para
					currentState.currentRun = &run
				case LineBreak:
					num := 0
					for key, val := range attribs {
						switch key {
						case "count":
							num1, err := strconv.Atoi(val)
							if err == nil {
								num = num1
							}
						}
					}
					var runner document.Run
					if currentState.currentPara != nil {
						runner = currentState.currentPara.AddRun()
					} else {
						runner = doc.AddParagraph().AddRun()
					}
					if num == 0 {
						num = 1
					}
					for itr := 1; itr <= num; itr++ {
						runner.AddBreak()
					}

				case InlineImage:
					run := currentState.currentPara.AddRun()
					setInlineImage(doc, &run, attribs)
					newRun := currentState.currentPara.AddRun()
					currentState.currentRun = &newRun
				case AnchorImage:
					run := currentState.currentPara.AddRun()
					setAnchoredImage(doc, &run, attribs)
					newRun := currentState.currentPara.AddRun()
					currentState.currentRun = &newRun
				case WhiteSpace:
					if currentState.currentPara != nil {
						run := currentState.currentPara.AddRun()
						run.AddText(" ")
					}
				case RupeeSymbol:
					if currentState.currentPara != nil {
						run := currentState.currentPara.AddRun()
						run.AddText("₹")
					}
				case Symbol:
					if hasAttrib {
						if len(attribs) != 0 {
							str := attribs["data"]
							if currentState.currentPara != nil {
								run := currentState.currentPara.AddRun()
								run.AddText(str)
							}
						}
					}
				default:
					if currentState.section == Global {
						switch tname {
						case GlobalFont:
							setGlobalFontStyle(doc, attribs)
						case ParaSpacing:
							setGlobalParaSpacing(doc, attribs)
						case GlobalHeading:
							setGlobalHeadingSize(&globalConsts, attribs)

						}
					} else if currentState.section == TableRow {
						switch tname {
						case TableRowMargin:
							currentState.setTableRowCellMargin(attribs)
						case TableRowShading:
							currentState.setTableRowShading(attribs)
						}
					} else if currentState.section == TableBorder {
						currentState.setTableBorder(attribs, tname)
					} else if currentState.section == DocPageBorder {
						switch tname {
						case BorderAll:
							setAllDocBorder(doc, attribs)
						case BorderTop:
							setTopDocBorder(doc, attribs)
						case BorderBottom:
							setBottomDocBorder(doc, attribs)
						case BorderRight, BorderLeft:
							setLeftRightDocBorder(doc, attribs, tname)
						}
					} else if currentState.section == ParagraphBorder {
						switch tname {
						case BorderTop, BorderRight, BorderBottom, BorderLeft, BorderAll:
							currentState.applyParaBorder(attribs, tname)
						}
					} else if currentState.section == Paragraph {
						switch tname {
						case ParaShading:
							currentState.applyParaShading(attribs)
						case ParaAlignment:
							currentState.applyParaAlignment(attribs)
						case ParaText:
							currentState.applyParaTextProps(attribs)
						case ParaFrame:
							currentState.applyParaFrame(attribs)
						case ParaIndent:
							currentState.applyParaIndent(attribs)
						case ParaTextBoxTightWrap:
							currentState.applyParaTextBoxTightWrap(attribs)
						case ParaSpacing:
							currentState.applyParaSpacing(attribs)
						}
					} else if currentState.section == Document {
						switch tname {
						case DocBackground:
							setDocBackground(doc, attribs)
						case DocPageSize:
							setDocPageSize(doc, attribs)
						case DocPageMargin:
							setDocPageMargin(doc, attribs)
						}
					}
				}
			}
		case html.TextToken:
			data := tokenizer.Text()
			re := regexp.MustCompile(" +")
			replaced := re.ReplaceAll(bytes.TrimSpace(data), []byte(" "))
			txt := string(replaced)
			//txt = strings.TrimSpace(txt)
			if txt != "" {
				if currentState != nil {
					if currentState.section == DocProps {
						switch currentState.currentTag {
						case Title:
							doc.CoreProperties.SetTitle(txt)
						case Author:
							doc.CoreProperties.SetAuthor(txt)
						case Description:
							doc.CoreProperties.SetDescription(txt)
						case Category:
							doc.CoreProperties.SetCategory(txt)
						case Version:
							doc.AppProperties.SetApplicationVersion(txt)
						case Application:
							doc.AppProperties.SetApplication(txt)
						case Company:
							doc.AppProperties.SetCompany(txt)
						}
					} else if currentState.section == Heading1 || currentState.section == Heading2 || currentState.section == Heading3 {
						run := currentState.currentPara.AddRun()
						if currentState.currentTextStyle != nil && currentState.currentPara != nil {
							if currentState.currentTextStyle.font != nil {
								oldSize := currentState.currentTextStyle.font.size
								switch currentState.section {
								case Heading1:
									currentState.currentTextStyle.font.size = globalConsts.h1
								case Heading2:
									currentState.currentTextStyle.font.size = globalConsts.h2
								case Heading3:
									currentState.currentTextStyle.font.size = globalConsts.h3
								case Heading4:
									currentState.currentTextStyle.font.size = globalConsts.h4
								case Heading5:
									currentState.currentTextStyle.font.size = globalConsts.h5
								case Heading6:
									currentState.currentTextStyle.font.size = globalConsts.h6
								}
								applyTextFormattingToRun(currentState, &run)
								run.AddText(txt)
								currentState.currentTextStyle.font.size = oldSize
							}
						}
					} else if currentState.currentTextStyle != nil && currentState.currentPara != nil {
						run := currentState.currentPara.AddRun()
						applyTextFormattingToRun(currentState, &run)
						run.AddText(txt)
					} else if currentState.currentRun != nil {
						currentState.currentRun.AddText(txt)
					}
				}
			}
		}
	}
	var buf bytes.Buffer
	doc.Save(&buf)
	return &buf, nil
}
