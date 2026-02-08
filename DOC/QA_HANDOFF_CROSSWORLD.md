# QA Handoff Cross-World

Date: 2026-02-09

Checklist:

| Step | Action | Expected | Result (PASS/FAIL) |
| --- | --- | --- | --- |
| 1 | Open W3 Palette, apply a known palette (ex: #FF0000, #00FF00, #0000FF). | Palette updates to the chosen colors. |  |
| 2 | Use Topbar to switch to W2 Gradient. | Gradient stops match the palette colors and URL includes `bufferId`. |  |
| 3 | From W2 Gradient, switch to W4 Printcolor via Topbar. | Color list loads with the buffer palette colors. |  |
| 4 | From W4 Printcolor, switch to W6 PaintFabric. | Base color matches the first buffer color. |  |
| 5 | From W6 PaintFabric, switch to W7 Imagecolor. | Palette/swatches reflect the buffer palette colors. |  |
| 6 | From W7 Imagecolor, switch to W8 Colorplay. | Game colors use the buffer palette (custom palette applied). |  |
| 7 | From W5 Library, open a Palette asset (assetId). | W3 Palette loads asset colors (no legacy hash apply). |  |
| 8 | From W5 Library, open a Gradient asset (assetId). | W2 Gradient loads asset stops correctly. |  |
| 9 | From W5 Library, open a Printcolor asset (assetId). | W4 Printcolor loads asset colors. |  |
| 10 | Open W3 Palette with `?bufferId=...#p=...`. | Buffer colors win; hash is ignored. |  |
| 11 | Open W3 Palette with legacy `#p=...` only. | Palette loads from hash colors. |  |
| 12 | Open W2 Gradient with legacy `#g=...` only. | Gradient loads from hash stops. |  |
| 13 | Open W1 Threadcolor with legacy `?color=...` only. | Input/search uses the query color. |  |
