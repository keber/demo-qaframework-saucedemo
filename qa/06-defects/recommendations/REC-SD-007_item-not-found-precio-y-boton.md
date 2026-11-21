# REC-SD-007: El detalle de un producto inexistente muestra un precio anómalo y un botón operable

| Field | Value |
|-------|-------|
| ID | REC-SD-007 |
| Module | INV |
| Category | Manejo de errores |
| Related TCs | TC-INV-CAT-017 |
| Date | 2026-11-21 |
| Status | Open |

## Hallazgo

`/inventory-item.html?id=99` muestra "ITEM NOT FOUND" (asertado en verde) con precio "$√-1" y un botón "Add to cart" que funciona.

## Por qué no es un defecto

Ninguna regla de negocio de `qa/01-specifications/` exige otro comportamiento (registrado como REC en la sección "Desviaciones observadas" de `01-business-rules.md`). No justifica un `test.fail()` ni un marcador de defecto.

## Recomendación

Mostrar una página 404 sin precio ni botón de compra.
