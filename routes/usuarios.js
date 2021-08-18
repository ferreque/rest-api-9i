const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();
//controladores
const { validarCampos } = require("../controllers/middlewares/validar-campos");
const { emailExiste, idExiste } = require("../helpers/db-validators");

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} = require("../controllers/usuarios");
router.get("/", usuariosGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "Debe tener una contraseña").not().isEmpty().trim(),
    check(
      "password",
      "La constraseña debe tener al menos 5 caracteres"
    ).isLength({ min: 5 }),
    check("email").custom(emailExiste),
    check("email", "No es un email válido").isEmail(),
    check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    validarCampos,
  ],

  usuariosPost
);

router.put(
  "/:id",
  [
    check("id", "No es un Id válido").isMongoId(),
    check("id").custom(idExiste),
    validarCampos,
  ],
  usuariosPut
);

router.delete("/:id", usuariosDelete);

module.exports = router;
