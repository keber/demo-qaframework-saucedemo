# REC-SD-003: La sesión expira a los 10 minutos aunque el usuario esté activo

| Field | Value |
|-------|-------|
| ID | REC-SD-003 |
| Module | AUTH |
| Category | Usabilidad |
| Related TCs | TC-AUTH-LOG-023 |
| Date | 2026-11-21 |
| Status | Open |

## Hallazgo

La cookie `session-username` expira 600 s después del login y no se renueva con la actividad (verificado en la etapa 2 y en TC-AUTH-LOG-023). Un usuario activo pierde la sesión a mitad de una compra.

## Por qué no es un defecto

Ninguna regla de negocio de `qa/01-specifications/` exige otro comportamiento (registrado como REC en la sección "Desviaciones observadas" de `01-business-rules.md`). No justifica un `test.fail()` ni un marcador de defecto.

## Recomendación

Usar expiración deslizante (renovar con la actividad). Impacto en la automatización: `fixtures/base.ts` renueva el storageState antes de que venza.
