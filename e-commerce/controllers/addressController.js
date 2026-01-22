import Address from "../models/Adress.js";

//Save Address
export const saveAddress = async (req, res) => {
    try{
        const address = await Address.create(req.body);
        res.json({ message: "Address saved successfully", address });
    } catch (error) {
        res.status(500).json({ message: "Error saving address", error });
    }
};

//Get Addresses by User ID
export const getAddresses = async (req, res) => {
    try{
        const addresses = await Address.find({
            userId: req.params.userId
        })
        res.json(addresses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching addresses", error });
    }
};
//Get Addresses by User ID
export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const address = await Address.findByIdAndDelete(id);

    if (!address) {
      return res.status(404).json({
        message: "Address not found"
      });
    }

    res.status(200).json({
      message: "Address deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting address",
      error: error.message
    });
  }
};
