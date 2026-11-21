# REC-SD-004: `/checkout-complete.html` es accesible directamente sin una compra

| Field | Value |
|-------|-------|
| ID | REC-SD-004 |
| Module | CHK |
| Category | Integridad del flujo |
| Related TCs | - |
| Date | 2026-11-21 |
| Status | Open |

## Hallazgo

Con sesión, navegar a `/checkout-complete.html` muestra la confirmación "Thank you for your order!" sin haber completado una orden.

## Por qué no es un defecto

Ninguna regla de negocio de `qa/01-specifications/` exige otro comportamiento (registrado como REC en la sección "Desviaciones observadas" de `01-business-rules.md`). No justifica un `test.fail()` ni un marcador de defecto.

## Recomendación

Redirigir al catálogo cuando no hay una orden recién completada. RN-CHK-016 solo cubre el paso 2, por eso no es un defecto.
