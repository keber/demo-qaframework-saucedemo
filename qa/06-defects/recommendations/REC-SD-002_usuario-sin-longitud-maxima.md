# REC-SD-002: El campo usuario del login no tiene longitud máxima

| Field | Value |
|-------|-------|
| ID | REC-SD-002 |
| Module | AUTH |
| Category | Robustez |
| Related TCs | - |
| Date | 2026-11-21 |
| Status | Open |

## Hallazgo

El input `username` no declara `maxlength` y acepta textos arbitrariamente largos.

## Por qué no es un defecto

Ninguna regla de negocio de `qa/01-specifications/` exige otro comportamiento (registrado como REC en la sección "Desviaciones observadas" de `01-business-rules.md`). No justifica un `test.fail()` ni un marcador de defecto.

## Recomendación

Definir una longitud máxima razonable en el input y en la validación.
