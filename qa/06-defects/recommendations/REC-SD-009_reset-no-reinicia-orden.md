# REC-SD-009: Reset App State no reinicia el orden del listado

| Field | Value |
|-------|-------|
| ID | REC-SD-009 |
| Module | NAV |
| Category | Alcance funcional |
| Related TCs | TC-NAV-MENU-008 |
| Date | 2026-11-21 |
| Status | Open |

## Hallazgo

Tras Reset App State el listado conserva el orden elegido (p. ej. "Name (Z to A)"). RN-NAV-006 no define que el reset reinicie el orden.

## Por qué no es un defecto

Ninguna regla de negocio de `qa/01-specifications/` exige otro comportamiento (registrado como REC en la sección "Desviaciones observadas" de `01-business-rules.md`). No justifica un `test.fail()` ni un marcador de defecto.

## Recomendación

Definir explícitamente el alcance de "Reset App State".
