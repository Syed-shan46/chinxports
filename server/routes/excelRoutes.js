const express = require("express");
const ExcelJS = require("exceljs");
const path = require("path");
const fs = require("fs");

const router = express.Router();

router.get("/generate-cart-excel", async (req, res) => {
  try {
    const cart = req.session.cart || [];

    if (cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Cart Details");

    // Columns
    sheet.columns = [
      { header: "Product Name", key: "name", width: 30 },
      { header: "Image", key: "image", width: 20 },
      { header: "Quantity", key: "qty", width: 10 },
      { header: "Unit Price", key: "price", width: 15 },
      { header: "Total", key: "total", width: 15 },
    ];

    // Insert rows + images
    let rowIndex = 2;

    for (let item of cart) {
      const total = item.price * item.quantity;

      sheet.addRow({
        name: item.productName,
        qty: item.quantity,
        price: item.price,
        total: total,
      });

      // Download image to temp folder
      const imagePath = path.join(__dirname, "../temp", `${item.productId}.jpg`);

      const response = await fetch(item.imageUrl);
      const buffer = Buffer.from(await response.arrayBuffer());
      fs.writeFileSync(imagePath, buffer);

      // Add image to workbook
      const imageId = workbook.addImage({
        filename: imagePath,
        extension: "jpg"
      });

      sheet.addImage(imageId, {
        tl: { col: 1, row: rowIndex - 1 },
        ext: { width: 70, height: 70 }
      });

      rowIndex++;
    }

    // Save Excel file
    const fileName = `cart-${Date.now()}.xlsx`;
    const outputPath = path.join(__dirname, "../public/excel", fileName);

    await workbook.xlsx.writeFile(outputPath);

    const fileUrl = `${req.protocol}://${req.get("host")}/excel/${fileName}`;

    res.json({ success: true, url: fileUrl });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating Excel" });
  }
});

module.exports = router;
