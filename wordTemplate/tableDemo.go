package main

import (
	"fmt"

	"github.com/unidoc/unioffice/color"
	"github.com/unidoc/unioffice/document"
	"github.com/unidoc/unioffice/measurement"
	"github.com/unidoc/unioffice/schema/soo/wml"
)

func main2() {
	doc := document.New()

	table := doc.AddTable()
	table.Properties().SetAlignment(wml.ST_JcTableRight)
	table.Properties().SetLayout(wml.ST_TblLayoutTypeFixed)
	table.Properties().Borders().SetAll(wml.ST_BorderSingle, color.Black, measurement.Point*1)
	table.Properties().SetWidthPercent(90)
	//table.Properties().SetCellSpacingPercent(30)

	for i := 0; i < 5; i++ {
		row := table.AddRow()
		if i == 0 {
			row.Properties().SetHeight(measurement.Distance(35), wml.ST_HeightRuleAtLeast)
		}
		for j := 0; j < 5; j++ {
			if i == 2 && j == 4 {
				continue
			}
			cell := row.AddCell()
			if i == 0 {
				cell.Properties().SetShading(wml.ST_ShdSolid, color.LightBlue, color.Black)
			}
			cell.Properties().Margins().SetBottom(measurement.Distance(5))
			cell.Properties().Margins().SetTop(measurement.Distance(5))
			cell.Properties().Margins().SetLeft(measurement.Distance(5))
			cell.Properties().Margins().SetRight(measurement.Distance(5))
			para := cell.AddParagraph()
			run := para.AddRun()
			if j == 0 || j == 2 {
				para.Properties().SetAlignment(wml.ST_JcCenter)
			}
			if i == 2 && j == 3 {
				cell.Properties().SetColumnSpan(2)
			}
			if j == 0 && i == 1 {
				cell.Properties().SetVerticalMerge(wml.ST_MergeRestart)
				cell.Properties().SetVerticalAlignment(wml.ST_VerticalJcCenter)
			}
			if j == 0 && i == 2 {
				cell.Properties().SetVerticalMerge(wml.ST_MergeContinue)
			}
			if i == 0 {
				run.Properties().SetBold(true)
			}
			run.AddText(fmt.Sprintf("Heading Column row %d col %d", i+1, j+1))
		}
	}
	doc.SaveToFile("demo.docx")
}

/*
<table alignment={} width={%} layoutDefault={fixed}>
<tableBorder>
<insideHorizontal>
<insideVertical>
<all>
<left>
<right>
<top>
<bottom>
</tableBorder>
<tr height={35,1} alignment={} //on cell>
<shading style={} color={} fill={}/> //on cell
<margin bottom={} top={} left={} right={}/> //on cell
<td colspan={} rowspan={}>
Text
</td>
</tr>
</table>
*/
