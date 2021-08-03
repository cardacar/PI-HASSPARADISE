import inventory from "../models/inventoryModel";

export const createInventory = async (req, res) => {
  const { product, activeIngredient, typeProduct, module } = req.body;

  const newInventory = new inventory({
    product,
    activeIngredient,
    typeProduct,
    module,
  });

  const inventorySave = await newInventory.save();
  res.status(201).json(inventorySave);
};

export const getAllInventory = async (req, res) => {
  const allInventory = await inventory.find();
  res.json(allInventory);
};

export const getInventoryById = async (req, res) => {
  const { inventoryId } = req.params;
  const getInventory = await inventory.findById(inventoryId);
  res.json(getInventory);
};

export const updateInventoryById = async (req, res) => {
  const { inventoryId } = req.params;
  const updateInventoy = await inventory.findByIdAndUpdate(
    inventoryId,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updateInventoy);
};

export const deleteInventoryById = async (req, res) => {
  const { inventoryId } = req.params;
  console.log(inventoryId);
  await inventory.findByIdAndDelete(inventoryId);
  res.status(204).json();
};
