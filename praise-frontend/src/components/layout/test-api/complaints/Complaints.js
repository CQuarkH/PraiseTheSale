export const complaints = [
    {
      id: 1,
      userID: 1,
      subject: "Defective Product Received",
      context: "I was eagerly waiting for the product, but when it arrived, I noticed significant damages on the sides. It seems like it wasn't handled with care during shipping.",
      dateTime: "2023-09-10 14:30",
      status: "pending",
      resolutionDetails: "notResolved",
      productID: 2,
      targetID: 3
    },
    {
      id: 2,
      userID: 2,
      subject: "Unresponsive Seller",
      context: "I've tried reaching out to the seller multiple times regarding some queries about the product. It's been days, and I haven't received any response.",
      dateTime: "2023-09-11 10:15",
      status: "resolved",
      resolutionDetails: "Seller was warned and apologized.",
      productID: 4,
      targetID: 1
    },
    {
      id: 3,
      userID: 4,
      subject: "Misleading Product Description",
      context: "The product I received looks nothing like what was shown in the pictures. The description mentioned specific features that are absent in the product I got.",
      dateTime: "2023-09-12 16:45",
      status: "pending",
      resolutionDetails: "notResolved",
      productID: 7,
      targetID: 2
    },
    {
      id: 4,
      userID: 1,
      subject: "Incorrect Product Delivered",
      context: "I ordered a specific model of a gadget, but I received a completely different one. This is not what I paid for, and I'm very disappointed.",
      dateTime: "2023-09-13 09:30",
      status: "resolved",
      resolutionDetails: "Refund was issued to the buyer.",
      productID: 3,
      targetID: 4
    },
    {
      id: 5,
      userID: 5,
      subject: "Missing Parts in the Package",
      context: "The product arrived, but it was missing essential components. I can't use it without those parts. This is very inconvenient.",
      dateTime: "2023-09-14 11:20",
      status: "pending",
      resolutionDetails: "notResolved",
      productID: 2,
      targetID: 1
    },
    {
      id: 6,
      userID: 2,
      subject: "Product Malfunction",
      context: "The product was working fine for the first week, but then it suddenly stopped. I tried troubleshooting, but it seems to be a manufacturing defect.",
      dateTime: "2023-09-15 15:10",
      status: "resolved",
      resolutionDetails: "Replacement was sent to the buyer.",
      productID: 6,
      targetID: 3
    },
    {
      id: 7,
      userID: 1,
      subject: "Color Mismatch",
      context: "The color of the product I received is entirely different from what was shown on the website. It doesn't match my requirements at all.",
      dateTime: "2023-09-16 12:40",
      status: "pending",
      resolutionDetails: "notResolved",
      productID: 2,
      targetID: 2
    },
    {
      id: 8,
      userID: 3,
      subject: "Questionable Authenticity",
      context: "I have doubts about the authenticity of the product. It lacks certain markings and feels different from the genuine ones I've seen.",
      dateTime: "2023-09-17 14:50",
      status: "resolved",
      resolutionDetails: "Seller provided proof of authenticity.",
      productID: 4,
      targetID: 1
    },
    {
      id: 9,
      userID: 1,
      subject: "Delayed Delivery",
      context: "I was promised delivery within 3 days, but it's been over a week, and I still haven't received the product. This delay is causing inconvenience.",
      dateTime: "2023-09-18 10:10",
      status: "pending",
      resolutionDetails: "notResolved",
      productID: 2,
      targetID: 3
    },
    {
      id: 10,
      userID: 1,
      subject: "Size Mismatch",
      context: "The size of the product is not as described on the website. It's too small for my needs, and now I have to go through the return process.",
      dateTime: "2023-09-19 13:25",
      status: "resolved",
      resolutionDetails: "Seller offered a size exchange.",
      productID: 2,
      targetID: 4
    }
  ];
