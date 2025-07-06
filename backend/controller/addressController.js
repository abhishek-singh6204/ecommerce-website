const Address = require("../model/address");
const addAddress = async (req, res) => {
    try {
        // console.log("in route");
        const { userId, address, pincode, city, phone, notes } = req.body;
        if (!userId || !address || !pincode || !city || !phone || !notes) {
          return  res.status(400).json({
                success: false,
                message: "Invalid Data Provided"
            });
        }
        const newlyAddress = new Address({
            userId, address, pincode, city, phone, notes
        });
        await newlyAddress.save();
        res.status(200).json({
            success: true,
            data: newlyAddress
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error'
        })
    }
}
const fetchAllAddress = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
          return  res.status(400).json({
                success: false,
                message: "Userid is required"
            });
        }
        const addressList = await Address.find({ userId });
        if (addressList.length <= 0) {
          return  res.status(400).json({
                success: false,
                message: "Address Not Found!"
            });
        }
       return res.status(200).json({
            success: true,
            data: addressList
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error'
        })
    }
}
const editAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        const formData = req.body;
        // console.log(formData);
        // console.log(req.params);
        if (!userId || !addressId) {
           return res.status(400).json({
                success: false,
                message: "Userid  and addressId is required"
            });
        }
        const address =await Address.findByIdAndUpdate(addressId, formData,{ new: true });
        // console.log(address);
        if (!formData) {
           return res.status(400).json({
                success: false,
                message: "address required!"
            });
        }
       return res.status(200).json({
            success: true,
            message:"address edited sucessfully!"
        });
    } catch (err) {
      return  res.status(500).json({
            success: false,
            message: 'Error'
        })
    }
}
const deleteAddress = async (req, res) => {
    try {
        const { userId, addressid } = req.params;
        // console.log(addressId,userid);
        if (!userId || !addressid) {
           return  res.status(400).json({
                success: false,
                message: "Userid  and addressId is required"
            });
        }
        const address =await  Address.findByIdAndDelete(addressid)
        // console.log(address);
        if (!address) {
          return  res.status(400).json({
                success: false,
                message: "address not found!"
            });
        }
        return res.status(200).json({
            success: true,
            message:"Address deleted sucessfully !"
        });

    } catch (err) {
       return res.status(500).json({
            success: false,
            message: 'Error'
        })
    }
}
module.exports = { addAddress, fetchAllAddress, editAddress, deleteAddress }