# REC-SD-008: Lazy Load repite variantes y no tiene fin de lista

| Field | Value |
|-------|-------|
| ID | REC-SD-008 |
| Module | INV |
| Category | Calidad de datos / UX |
| Related TCs | TC-INV-DYN-003, TC-INV-DYN-004 |
| Date | 2026-11-21 |
| Status | Open |

## Hallazgo

La variante "Test.allTheThings() T-Shirt (Red) (L)" aparece dos veces seguidas en cada ciclo y la secuencia completa se repite sin fin.

## Por qué no es un defecto

Ninguna regla de negocio de `qa/01-specifications/` exige otro comportamiento (registrado como REC en la sección "Desviaciones observadas" de `01-business-rules.md`). No justifica un `test.fail()` ni un marcador de defecto.

## Recomendación

Eliminar el duplicado y definir un fin de lista o un límite de carga.
