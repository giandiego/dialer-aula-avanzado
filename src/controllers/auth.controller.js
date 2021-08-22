import User from "../models/Users";

export const Authorization = async (req, res) => {
  //Inicia sesión de un usuario registrado
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    //console.log("USER => ", user);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Login failed! Check authentication credentials",
      });
    }
    const token = await user.generateAuthToken();
    //res.send({ user, token })
    return res.json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || `Failed to authentication: ${error}`,
    });
  }
};

export const LogoutUser = async (req, res) => {
  //Inicia sesión de un usuario registrado
  try {
      req.user.tokens = req.user.tokens.filter((token) => {   // filtramos la matriz de tokens del usuario -> 
      return token.token != req.token                     // devolvemos true si alguno de los tokens no es igual al token que utilizó el usuario para iniciar sesión -> El arreglo filter method crea una nuevo arreglo con todos los elementos que pasan la prueba implementada. En nuestro caso anterior, el método de filtro devolverá un nuevo arreglo que contiene cualquier otro token aparte del que se usó para iniciar sesión
    })
    await req.user.save()
    return res.json({
      success: true,
      message: `User successfully logged out.`,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || `Failed to Logout: ${error}`,
    });
  }
};

export const LogoutAll = async (req, res) => {
  // Logout del usuario de todos los dispositivos
  try {
      req.user.tokens.splice(0, req.user.tokens.length)
      await req.user.save()
      return res.json({
        success: true,
        message: `All users successfully logged out.`,
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || `Failed to Logout: ${error}`,
    });
  }
}