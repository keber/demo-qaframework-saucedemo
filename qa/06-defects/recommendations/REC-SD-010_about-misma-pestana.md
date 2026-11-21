# REC-SD-010: About abre un sitio externo en la misma pestaña

| Field | Value |
|-------|-------|
| ID | REC-SD-010 |
| Module | NAV |
| Category | Usabilidad |
| Related TCs | TC-NAV-MENU-006 |
| Date | 2026-11-21 |
| Status | Open |

## Hallazgo

`about-sidebar-link` navega a `https://saucelabs.com/` en la misma pestaña y saca al usuario de la tienda (comportamiento definido por RN-NAV-004, por eso no es un defecto).

## Por qué no es un defecto

Ninguna regla de negocio de `qa/01-specifications/` exige otro comportamiento (registrado como REC en la sección "Desviaciones observadas" de `01-business-rules.md`). No justifica un `test.fail()` ni un marcador de defecto.

## Recomendación

Abrir los enlaces externos en una pestaña nueva, como los enlaces sociales del footer.
