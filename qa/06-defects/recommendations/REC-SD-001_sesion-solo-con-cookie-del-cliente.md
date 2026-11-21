# REC-SD-001: La sesión se valida solo con la cookie `session-username` del cliente

| Field | Value |
|-------|-------|
| ID | REC-SD-001 |
| Module | AUTH |
| Category | Seguridad |
| Related TCs | TC-AUTH-LOG-022 |
| Date | 2026-11-21 |
| Status | Open |

## Hallazgo

Una cookie `session-username` creada a mano con `standard_user` da acceso a `/inventory.html` sin pasar por el login. Las cookies con `locked_out_user` o un usuario inexistente sí se rechazan (TC-AUTH-LOG-022 en verde).

## Por qué no es un defecto

Ninguna regla de negocio de `qa/01-specifications/` exige otro comportamiento (registrado como REC en la sección "Desviaciones observadas" de `01-business-rules.md`). No justifica un `test.fail()` ni un marcador de defecto.

## Recomendación

La app es una demo sin backend; ninguna regla de negocio exige validación del lado servidor. En una app real, validar la sesión en el servidor con un token firmado.
