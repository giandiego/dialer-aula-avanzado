
export const StatusApiBase = async (req, res) => {
  try {
    const s = req.body,
      i = s.Data;
    
    if (!i){
      throw new Error("Arguments are missing in your query.");
    }

    res.json({
      success: true,
      message: `Estas Conectado a la API BASE`,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something goes wrong retrieving the StatusApiBase",
    });
  }
};