# REC-SD-006: El nombre del PDF usa hora UTC y "Order Date" la hora local

| Field | Value |
|-------|-------|
| ID | REC-SD-006 |
| Module | CHK |
| Category | Consistencia |
| Related TCs | TC-CHK-FLW-019, TC-CHK-FLW-026 |
| Date | 2026-11-21 |
| Status | Open |

## Hallazgo

Para la misma orden el archivo se llama `swag-labs-order-YYYY-MM-DD_HH-MM-SS.pdf` con la hora UTC, mientras el campo "Order Date" del PDF muestra la hora local del navegador.

## Por qué no es un defecto

Ninguna regla de negocio de `qa/01-specifications/` exige otro comportamiento (registrado como REC en la sección "Desviaciones observadas" de `01-business-rules.md`). No justifica un `test.fail()` ni un marcador de defecto.

## Recomendación

Usar la misma zona horaria en el nombre del archivo y en el contenido. Los tests no asertan la hora (depende de la zona horaria del runner).
