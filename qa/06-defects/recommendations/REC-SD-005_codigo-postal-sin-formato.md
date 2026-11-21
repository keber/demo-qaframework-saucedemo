# REC-SD-005: El código postal acepta letras y símbolos

| Field | Value |
|-------|-------|
| ID | REC-SD-005 |
| Module | CHK |
| Category | Calidad de datos |
| Related TCs | - |
| Date | 2026-11-21 |
| Status | Open |

## Hallazgo

`postalCode` acepta valores como `abc!@#` y el paso 1 avanza.

## Por qué no es un defecto

Ninguna regla de negocio de `qa/01-specifications/` exige otro comportamiento (registrado como REC en la sección "Desviaciones observadas" de `01-business-rules.md`). No justifica un `test.fail()` ni un marcador de defecto.

## Recomendación

Definir una regla de formato del código postal; hoy no existe ninguna regla explícita.
