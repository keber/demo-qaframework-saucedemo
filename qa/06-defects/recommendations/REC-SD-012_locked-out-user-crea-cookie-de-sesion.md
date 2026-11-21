# REC-SD-012: El login rechazado de `locked_out_user` crea igualmente la cookie de sesión

| Field | Value |
|-------|-------|
| ID | REC-SD-012 |
| Module | AUTH |
| Category | Seguridad / higiene de sesión |
| Related TCs | TC-AUTH-LOG-010, TC-AUTH-LOG-022 |
| Date | 2026-11-21 |
| Status | Open |
| Reclasificado desde | DEF-SD-019 (número retirado, no se reutiliza) |

## Hallazgo

Al iniciar sesión con `locked_out_user` y la contraseña correcta, la aplicación muestra "Epic sadface: Sorry, this user has been locked out.", deja al usuario en `/` y no muestra el listado, pero escribe igualmente la cookie `session-username` = `locked_out_user` (expira a los 600 s). La cookie es inerte: al navegar a `/inventory.html` el acceso se rechaza con el mensaje de ruta protegida (TC-AUTH-LOG-010 y TC-AUTH-LOG-022 en verde).

## Por qué no es un defecto

RN-AUTH-005 (`qa/01-specifications/module-auth/submodule-login/01-business-rules.md`) solo exige que se rechace el acceso, que el usuario permanezca en `/` y que se muestre el mensaje de bloqueo. Las tres condiciones se cumplen. La ausencia de la cookie figuraba únicamente en el resultado esperado de TC-AUTH-LOG-010, como una extensión del caso que ninguna regla de negocio respalda (regla 8: un hallazgo que no incumple ninguna regla no es un defecto). En la etapa 5b se revisó el TC (`[REVISED - 2026-11-21]` en `05-test-scenarios.md`): ahora verifica que el acceso queda rechazado también al navegar a una ruta protegida, que es lo que exige la regla.

## Recomendación

No escribir la cookie de sesión hasta validar que el usuario puede ingresar. Si en el futuro una regla de negocio exige que un login rechazado no deje rastro de sesión, mover este archivo a `qa/06-defects/open/` como defecto citando esa regla y restaurar la aserción de la cookie en TC-AUTH-LOG-010.

## Historial

| Fecha | Cambio |
|---|---|
| 2026-11-21 | Reportado en la etapa 5 como DEF-SD-019 (`test.fail()` en TC-AUTH-LOG-010) |
| 2026-11-21 | Etapa 5b: reclasificado como REC-SD-012 (RN-AUTH-005 no se incumple); DEF-SD-019 queda retirado y TC-AUTH-LOG-010 pasa a `test()` con la aserción de la regla |
