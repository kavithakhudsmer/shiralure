const productData = {
  men: {
    "tops-and-shirts": [
      {
        id: 1,
        name: "Classic Oxford Shirt",
        brand: "Ralph Lauren",
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        color: "blue",
        size: "M",
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
      },
      {
        id: 2,
        name: "Striped Button-Down Shirt",
        brand: "Tommy Hilfiger",
        price: 1499,
        originalPrice: 2299,
        discount: 35,
        color: "white",
        size: "L",
        image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=725&q=80"
      },
      {
        id: 3,
        name: "Linen Blend Shirt",
        brand: "Zara",
        price: 999,
        originalPrice: 1499,
        discount: 33,
        color: "beige",
        size: "M",
        image: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 101,
        name: "Checkered Casual Shirt",
        brand: "GAP",
        price: 1199,
        originalPrice: 1799,
        discount: 33,
        color: "red",
        size: "XL",
        image: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 102,
        name: "Slim Fit Dress Shirt",
        brand: "Calvin Klein",
        price: 1699,
        originalPrice: 2499,
        discount: 32,
        color: "light blue",
        size: "L",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
      },
      {
        id: 103,
        name: "Hawaiian Print Shirt",
        brand: "Old Navy",
        price: 899,
        originalPrice: 1299,
        discount: 31,
        color: "multicolor",
        size: "M",
        image: "https://images.unsplash.com/photo-1517191297489-48c463380e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      }
    ],
    "casual-t-shirts": [
      {
        id: 4,
        name: "Cotton Crew Neck T-Shirt",
        brand: "H&M",
        price: 499,
        originalPrice: 799,
        discount: 38,
        color: "black",
        size: "M",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
      },
      {
        id: 5,
        name: "Graphic Print T-Shirt",
        brand: "Levis",
        price: 699,
        originalPrice: 999,
        discount: 30,
        color: "gray",
        size: "L",
        image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 6,
        name: "Henley Neck T-Shirt",
        brand: "GAP",
        price: 799,
        originalPrice: 1299,
        discount: 38,
        color: "green",
        size: "XL",
        image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=671&q=80"
      },
      {
        id: 104,
        name: "V-Neck Basic T-Shirt",
        brand: "Uniqlo",
        price: 599,
        originalPrice: 899,
        discount: 33,
        color: "navy",
        size: "S",
        image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 105,
        name: "Striped T-Shirt",
        brand: "Puma",
        price: 899,
        originalPrice: 1399,
        discount: 36,
        color: "blue/white",
        size: "M",
        image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 106,
        name: "Long Sleeve T-Shirt",
        brand: "Nike",
        price: 999,
        originalPrice: 1499,
        discount: 33,
        color: "red",
        size: "L",
        image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      }
    ],
    "formal-shirts": [
      {
        id: 107,
        name: "Business Formal Shirt",
        brand: "Arrow",
        price: 1499,
        originalPrice: 2299,
        discount: 35,
        color: "white",
        size: "M",
        image: "https://images.unsplash.com/photo-1563630423918-b58f07336ac9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 108,
        name: "French Cuff Shirt",
        brand: "Van Heusen",
        price: 1799,
        originalPrice: 2599,
        discount: 31,
        color: "light blue",
        size: "L",
        image: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
      },
      {
        id: 109,
        name: "Slim Fit Formal Shirt",
        brand: "Peter England",
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        color: "black",
        size: "M",
        image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80"
      },
      {
        id: 110,
        name: "Striped Formal Shirt",
        brand: "Louis Philippe",
        price: 1899,
        originalPrice: 2799,
        discount: 32,
        color: "blue/white",
        size: "XL",
        image: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 111,
        name: "Checkered Formal Shirt",
        brand: "Park Avenue",
        price: 1599,
        originalPrice: 2399,
        discount: 33,
        color: "blue/black",
        size: "L",
        image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 112,
        name: "Wrinkle-Free Formal Shirt",
        brand: "Allen Solly",
        price: 1399,
        originalPrice: 2099,
        discount: 33,
        color: "light pink",
        size: "M",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
      }
    ],
    "dress-shirts": [
      {
        id: 113,
        name: "Tuxedo Dress Shirt",
        brand: "Calvin Klein",
        price: 2499,
        originalPrice: 3499,
        discount: 29,
        color: "white",
        size: "M",
        image: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
      },
      {
        id: 114,
        name: "Wing Collar Dress Shirt",
        brand: "Tommy Hilfiger",
        price: 2299,
        originalPrice: 3299,
        discount: 30,
        color: "white",
        size: "L",
        image: "https://images.unsplash.com/photo-1563630423918-b58f07336ac9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 115,
        name: "Pleated Front Dress Shirt",
        brand: "Brooks Brothers",
        price: 2799,
        originalPrice: 3999,
        discount: 30,
        color: "cream",
        size: "M",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
      },
      {
        id: 116,
        name: "Slim Fit Dress Shirt",
        brand: "Hugo Boss",
        price: 2599,
        originalPrice: 3799,
        discount: 32,
        color: "light blue",
        size: "L",
        image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80"
      },
      {
        id: 117,
        name: "French Cuff Dress Shirt",
        brand: "Ralph Lauren",
        price: 2899,
        originalPrice: 4199,
        discount: 31,
        color: "white",
        size: "XL",
        image: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 118,
        name: "Spread Collar Dress Shirt",
        brand: "Armani",
        price: 3199,
        originalPrice: 4599,
        discount: 30,
        color: "light pink",
        size: "M",
        image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      }
    ],
    "jeans": [
      {
        id: 7,
        name: "Slim Fit Jeans",
        brand: "Levis",
        price: 1999,
        originalPrice: 2999,
        discount: 33,
        color: "blue",
        size: "32",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80"
      },
      {
        id: 8,
        name: "Straight Fit Jeans",
        brand: "Wrangler",
        price: 1799,
        originalPrice: 2499,
        discount: 28,
        color: "black",
        size: "34",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 119,
        name: "Skinny Fit Jeans",
        brand: "H&M",
        price: 1499,
        originalPrice: 2299,
        discount: 35,
        color: "dark blue",
        size: "30",
        image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
      },
      {
        id: 120,
        name: "Relaxed Fit Jeans",
        brand: "Lee",
        price: 1899,
        originalPrice: 2799,
        discount: 32,
        color: "light blue",
        size: "36",
        image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
      },
      {
        id: 121,
        name: "Bootcut Jeans",
        brand: "Pepe Jeans",
        price: 2099,
        originalPrice: 2999,
        discount: 30,
        color: "mid blue",
        size: "34",
        image: "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 122,
        name: "Distressed Jeans",
        brand: "Jack & Jones",
        price: 1699,
        originalPrice: 2499,
        discount: 32,
        color: "blue",
        size: "32",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      }
    ],
    "trousers-and-pants": [
      {
        id: 123,
        name: "Chino Trousers",
        brand: "Dockers",
        price: 1599,
        originalPrice: 2299,
        discount: 30,
        color: "khaki",
        size: "32",
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 124,
        name: "Formal Trousers",
        brand: "Arrow",
        price: 1799,
        originalPrice: 2599,
        discount: 31,
        color: "black",
        size: "34",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 125,
        name: "Pleated Trousers",
        brand: "Louis Philippe",
        price: 1999,
        originalPrice: 2899,
        discount: 31,
        color: "navy",
        size: "32",
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
      },
      {
        id: 126,
        name: "Slim Fit Trousers",
        brand: "Peter England",
        price: 1499,
        originalPrice: 2199,
        discount: 32,
        color: "grey",
        size: "30",
        image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 127,
        name: "Cargo Pants",
        brand: "GAP",
        price: 1899,
        originalPrice: 2799,
        discount: 32,
        color: "olive",
        size: "34",
        image: "https://images.unsplash.com/photo-1517438476312-10d79c077509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 128,
        name: "Linen Trousers",
        brand: "Zara",
        price: 1699,
        originalPrice: 2499,
        discount: 32,
        color: "beige",
        size: "32",
        image: "https://images.unsplash.com/photo-1584865288642-42078afe6942?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      }
    ],
    "joggers-and-sweat-pants": [
      {
        id: 129,
        name: "Cotton Joggers",
        brand: "Nike",
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        color: "grey",
        size: "M",
        image: "https://images.unsplash.com/photo-1580906853203-f13ea2c1b881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 130,
        name: "Fleece Sweatpants",
        brand: "Adidas",
        price: 1499,
        originalPrice: 2299,
        discount: 35,
        color: "black",
        size: "L",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 131,
        name: "Track Pants",
        brand: "Puma",
        price: 1199,
        originalPrice: 1799,
        discount: 33,
        color: "navy",
        size: "M",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80"
      },
      {
        id: 132,
        name: "Slim Fit Joggers",
        brand: "Under Armour",
        price: 1599,
        originalPrice: 2399,
        discount: 33,
        color: "charcoal",
        size: "L",
        image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
      },
      {
        id: 133,
        name: "Cargo Joggers",
        brand: "H&M",
        price: 999,
        originalPrice: 1499,
        discount: 33,
        color: "olive",
        size: "M",
        image: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 134,
        name: "Tapered Sweatpants",
        brand: "Reebok",
        price: 1399,
        originalPrice: 2099,
        discount: 33,
        color: "maroon",
        size: "XL",
        image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1009&q=80"
      }
    ],
    "shorts": [
      {
        id: 135,
        name: "Chino Shorts",
        brand: "GAP",
        price: 999,
        originalPrice: 1499,
        discount: 33,
        color: "beige",
        size: "32",
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 136,
        name: "Cargo Shorts",
        brand: "Levis",
        price: 1199,
        originalPrice: 1799,
        discount: 33,
        color: "olive",
        size: "34",
        image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 137,
        name: "Denim Shorts",
        brand: "Wrangler",
        price: 1099,
        originalPrice: 1699,
        discount: 35,
        color: "blue",
        size: "32",
        image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 138,
        name: "Athletic Shorts",
        brand: "Nike",
        price: 899,
        originalPrice: 1399,
        discount: 36,
        color: "black",
        size: "M",
        image: "https://images.unsplash.com/photo-1562886877-3a0d4944ed59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80"
      },
      {
        id: 139,
        name: "Bermuda Shorts",
        brand: "Tommy Hilfiger",
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        color: "navy",
        size: "34",
        image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 140,
        name: "Linen Shorts",
        brand: "Zara",
        price: 999,
        originalPrice: 1499,
        discount: 33,
        color: "white",
        size: "32",
        image: "https://images.unsplash.com/photo-1549062572-544a64fb0c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      }
    ],
    "suits-and-blazers": [
      {
        id: 141,
        name: "Two-Piece Suit",
        brand: "Raymond",
        price: 7999,
        originalPrice: 11999,
        discount: 33,
        color: "navy",
        size: "40",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
      },
      {
        id: 142,
        name: "Single Breasted Blazer",
        brand: "Louis Philippe",
        price: 4999,
        originalPrice: 7499,
        discount: 33,
        color: "black",
        size: "42",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      },
      {
        id: 143,
        name: "Double Breasted Blazer",
        brand: "Arrow",
        price: 5499,
        originalPrice: 8299,
        discount: 34,
        color: "grey",
        size: "40",
        image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 144,
        name: "Linen Blazer",
        brand: "Zara",
        price: 3999,
        originalPrice: 5999,
        discount: 33,
        color: "beige",
        size: "42",
        image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
      },
      {
        id: 145,
        name: "Three-Piece Suit",
        brand: "Van Heusen",
        price: 8999,
        originalPrice: 13499,
        discount: 33,
        color: "charcoal",
        size: "40",
        image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      },
      {
        id: 146,
        name: "Slim Fit Blazer",
        brand: "Peter England",
        price: 4499,
        originalPrice: 6799,
        discount: 34,
        color: "navy",
        size: "38",
        image: "https://images.unsplash.com/photo-1598808503746-f34cfb6e1688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      }
    ],
    "sweaters-and-cardigans": [
      {
        id: 147,
        name: "Wool Sweater",
        brand: "GAP",
        price: 1799,
        originalPrice: 2699,
        discount: 33,
        color: "navy",
        size: "M",
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1072&q=80"
      },
      {
        id: 148,
        name: "Cable Knit Sweater",
        brand: "H&M",
        price: 1499,
        originalPrice: 2299,
        discount: 35,
        color: "cream",
        size: "L",
        image: "https://images.unsplash.com/photo-1599719500956-d158a26ab3ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 149,
        name: "V-Neck Cardigan",
        brand: "Marks & Spencer",
        price: 1999,
        originalPrice: 2999,
        discount: 33,
        color: "grey",
        size: "M",
        image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 150,
        name: "Turtleneck Sweater",
        brand: "Zara",
        price: 1699,
        originalPrice: 2499,
        discount: 32,
        color: "black",
        size: "L",
        image: "https://images.unsplash.com/photo-1608063615781-e2ef8c73d114?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 151,
        name: "Button-Up Cardigan",
        brand: "United Colors of Benetton",
        price: 1899,
        originalPrice: 2799,
        discount: 32,
        color: "burgundy",
        size: "XL",
        image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 152,
        name: "Cashmere Blend Sweater",
        brand: "Tommy Hilfiger",
        price: 2999,
        originalPrice: 4499,
        discount: 33,
        color: "camel",
        size: "M",
        image: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      }
    ]
  },
  women: {
    "kurtis": [
      {
        id: 9,
        name: "Embroidered Kurti",
        brand: "Biba",
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        color: "red",
        size: "M",
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 10,
        name: "Printed Kurti",
        brand: "W",
        price: 999,
        originalPrice: 1499,
        discount: 33,
        color: "blue",
        size: "L",
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 153,
        name: "Anarkali Kurti",
        brand: "Aurelia",
        price: 1499,
        originalPrice: 2299,
        discount: 35,
        color: "green",
        size: "M",
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 154,
        name: "A-Line Kurti",
        brand: "Global Desi",
        price: 1199,
        originalPrice: 1799,
        discount: 33,
        color: "yellow",
        size: "L",
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 155,
        name: "Straight Cut Kurti",
        brand: "Fabindia",
        price: 1399,
        originalPrice: 2099,
        discount: 33,
        color: "maroon",
        size: "S",
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 156,
        name: "Floral Kurti",
        brand: "Rangriti",
        price: 999,
        originalPrice: 1499,
        discount: 33,
        color: "pink",
        size: "M",
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      }
    ],
    "sarees": [
      {
        id: 11,
        name: "Silk Saree",
        brand: "Sabyasachi",
        price: 5999,
        originalPrice: 8999,
        discount: 33,
        color: "red",
        size: "Free Size",
        image: "https://images.unsplash.com/photo-1610189020382-668a5b0e7efa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 12,
        name: "Cotton Saree",
        brand: "FabIndia",
        price: 1999,
        originalPrice: 2999,
        discount: 33,
        color: "yellow",
        size: "Free Size",
        image: "https://images.unsplash.com/photo-1610189020382-668a5b0e7efa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 157,
        name: "Banarasi Saree",
        brand: "Manyavar",
        price: 4999,
        originalPrice: 7499,
        discount: 33,
        color: "purple",
        size: "Free Size",
        image: "https://images.unsplash.com/photo-1610189020382-668a5b0e7efa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 158,
        name: "Georgette Saree",
        brand: "Soch",
        price: 2499,
        originalPrice: 3799,
        discount: 34,
        color: "blue",
        size: "Free Size",
        image: "https://images.unsplash.com/photo-1610189020382-668a5b0e7efa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 159,
        name: "Chiffon Saree",
        brand: "Kalyan Silks",
        price: 1899,
        originalPrice: 2799,
        discount: 32,
        color: "pink",
        size: "Free Size",
        image: "https://images.unsplash.com/photo-1610189020382-668a5b0e7efa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 160,
        name: "Linen Saree",
        brand: "Nalli",
        price: 2299,
        originalPrice: 3499,
        discount: 34,
        color: "green",
        size: "Free Size",
        image: "https://images.unsplash.com/photo-1610189020382-668a5b0e7efa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      }
    ],
    "dresses": [
      {
        id: 13,
        name: "Floral Maxi Dress",
        brand: "Zara",
        price: 1999,
        originalPrice: 2999,
        discount: 33,
        color: "pink",
        size: "M",
        image: "https://images.unsplash.com/photo-1623609163859-ca93c959b5b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80"
      },
      {
        id: 14,
        name: "Bodycon Dress",
        brand: "H&M",
        price: 1499,
        originalPrice: 2299,
        discount: 35,
        color: "black",
        size: "S",
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=708&q=80"
      },
      {
        id: 161,
        name: "A-Line Dress",
        brand: "Mango",
        price: 1799,
        originalPrice: 2699,
        discount: 33,
        color: "blue",
        size: "M",
        image: "https://images.unsplash.com/photo-1623609163859-ca93c959b5b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80"
      },
      {
        id: 162,
        name: "Wrap Dress",
        brand: "Forever 21",
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        color: "red",
        size: "L",
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=708&q=80"
      },
      {
        id: 163,
        name: "Shift Dress",
        brand: "AND",
        price: 1599,
        originalPrice: 2399,
        discount: 33,
        color: "green",
        size: "S",
        image: "https://images.unsplash.com/photo-1623609163859-ca93c959b5b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80"
      },
      {
        id: 164,
        name: "Sheath Dress",
        brand: "Vero Moda",
        price: 1899,
        originalPrice: 2899,
        discount: 34,
        color: "navy",
        size: "M",
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=708&q=80"
      }
    ],
    "tops-and-tees": [
      {
        id: 165,
        name: "Basic T-Shirt",
        brand: "H&M",
        price: 599,
        originalPrice: 899,
        discount: 33,
        color: "white",
        size: "M",
        image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 166,
        name: "Printed Top",
        brand: "Zara",
        price: 899,
        originalPrice: 1399,
        discount: 36,
        color: "floral",
        size: "S",
        image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 167,
        name: "Blouse",
        brand: "Mango",
        price: 999,
        originalPrice: 1499,
        discount: 33,
        color: "blue",
        size: "M",
        image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 168,
        name: "Crop Top",
        brand: "Forever 21",
        price: 699,
        originalPrice: 999,
        discount: 30,
        color: "black",
        size: "S",
        image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 169,
        name: "Tunic Top",
        brand: "AND",
        price: 1199,
        originalPrice: 1799,
        discount: 33,
        color: "red",
        size: "L",
        image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 170,
        name: "Off-Shoulder Top",
        brand: "Vero Moda",
        price: 1099,
        originalPrice: 1699,
        discount: 35,
        color: "pink",
        size: "M",
        image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      }
    ],
    "jeans-and-pants": [
      {
        id: 171,
        name: "Skinny Jeans",
        brand: "Levis",
        price: 1799,
        originalPrice: 2699,
        discount: 33,
        color: "blue",
        size: "28",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 172,
        name: "Straight Leg Pants",
        brand: "H&M",
        price: 1499,
        originalPrice: 2299,
        discount: 35,
        color: "black",
        size: "30",
        image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 173,
        name: "Bootcut Jeans",
        brand: "Wrangler",
        price: 1899,
        originalPrice: 2799,
        discount: 32,
        color: "dark blue",
        size: "32",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 174,
        name: "Palazzo Pants",
        brand: "Global Desi",
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        color: "navy",
        size: "28",
        image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 175,
        name: "Culottes",
        brand: "AND",
        price: 1199,
        originalPrice: 1799,
        discount: 33,
        color: "beige",
        size: "30",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 176,
        name: "Jeggings",
        brand: "Vero Moda",
        price: 1399,
        originalPrice: 2099,
        discount: 33,
        color: "grey",
        size: "28",
        image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      }
    ],
    "skirts": [
      {
        id: 177,
        name: "A-Line Skirt",
        brand: "Zara",
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        color: "black",
        size: "M",
        image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
      },
      {
        id: 178,
        name: "Pleated Skirt",
        brand: "H&M",
        price: 999,
        originalPrice: 1499,
        discount: 33,
        color: "navy",
        size: "S",
        image: "https://images.unsplash.com/photo-1577900232427-18219b9166a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 179,
        name: "Pencil Skirt",
        brand: "Mango",
        price: 1399,
        originalPrice: 2099,
        discount: 33,
        color: "grey",
        size: "M",
        image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
      },
      {
        id: 180,
        name: "Midi Skirt",
        brand: "Forever 21",
        price: 1199,
        originalPrice: 1799,
        discount: 33,
        color: "floral",
        size: "L",
        image: "https://images.unsplash.com/photo-1577900232427-18219b9166a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 181,
        name: "Denim Skirt",
        brand: "Levis",
        price: 1499,
        originalPrice: 2299,
        discount: 35,
        color: "blue",
        size: "S",
        image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
      },
      {
        id: 182,
        name: "Maxi Skirt",
        brand: "AND",
        price: 1599,
        originalPrice: 2399,
        discount: 33,
        color: "red",
        size: "M",
        image: "https://images.unsplash.com/photo-1577900232427-18219b9166a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      }
    ],
    "sweaters-and-cardigans": [
      {
        id: 183,
        name: "Turtleneck Sweater",
        brand: "H&M",
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        color: "beige",
        size: "M",
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1072&q=80"
      },
      {
        id: 184,
        name: "Button-Up Cardigan",
        brand: "Zara",
        price: 1499,
        originalPrice: 2299,
        discount: 35,
        color: "grey",
        size: "S",
        image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 185,
        name: "V-Neck Sweater",
        brand: "Mango",
        price: 1199,
        originalPrice: 1799,
        discount: 33,
        color: "pink",
        size: "M",
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1072&q=80"
      },
      {
        id: 186,
        name: "Long Cardigan",
        brand: "Forever 21",
        price: 1399,
        originalPrice: 2099,
        discount: 33,
        color: "black",
        size: "L",
        image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 187,
        name: "Cable Knit Sweater",
        brand: "GAP",
        price: 1599,
        originalPrice: 2399,
        discount: 33,
        color: "cream",
        size: "M",
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1072&q=80"
      },
      {
        id: 188,
        name: "Cropped Cardigan",
        brand: "Vero Moda",
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        color: "blue",
        size: "S",
        image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      }
    ],
    "suits-and-blazers": [
      {
        id: 189,
        name: "Tailored Blazer",
        brand: "Zara",
        price: 2999,
        originalPrice: 4499,
        discount: 33,
        color: "black",
        size: "M",
        image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 190,
        name: "Pant Suit",
        brand: "H&M",
        price: 3999,
        originalPrice: 5999,
        discount: 33,
        color: "navy",
        size: "S",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
      },
      {
        id: 191,
        name: "Cropped Blazer",
        brand: "Mango",
        price: 2499,
        originalPrice: 3799,
        discount: 34,
        color: "white",
        size: "M",
        image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 192,
        name: "Skirt Suit",
        brand: "Marks & Spencer",
        price: 3499,
        originalPrice: 5299,
        discount: 34,
        color: "grey",
        size: "L",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
      },
      {
        id: 193,
        name: "Double Breasted Blazer",
        brand: "Vero Moda",
        price: 2799,
        originalPrice: 4199,
        discount: 33,
        color: "beige",
        size: "M",
        image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 194,
        name: "Linen Blazer",
        brand: "AND",
        price: 2599,
        originalPrice: 3899,
        discount: 33,
        color: "light blue",
        size: "S",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
      }
    ]
  },
  kids: {
    "boys-clothing": [
      {
        id: 15,
        name: "Graphic T-Shirt",
        brand: "GAP Kids",
        price: 499,
        originalPrice: 799,
        discount: 38,
        color: "blue",
        size: "8-9Y",
        image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1072&q=80"
      },
      {
        id: 16,
        name: "Denim Shorts",
        brand: "H&M Kids",
        price: 699,
        originalPrice: 999,
        discount: 30,
        color: "blue",
        size: "6-7Y",
        image: "https://images.unsplash.com/photo-1519238359922-989348752efb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 195,
        name: "Polo Shirt",
        brand: "Tommy Hilfiger Kids",
        price: 799,
        originalPrice: 1199,
        discount: 33,
        color: "red",
        size: "10-11Y",
        image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1072&q=80"
      },
      {
        id: 196,
        name: "Chino Pants",
        brand: "Zara Kids",
        price: 899,
        originalPrice: 1399,
        discount: 36,
        color: "beige",
        size: "8-9Y",
        image: "https://images.unsplash.com/photo-1519238359922-989348752efb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 197,
        name: "Hooded Sweatshirt",
        brand: "Nike Kids",
        price: 999,
        originalPrice: 1499,
        discount: 33,
        color: "grey",
        size: "10-11Y",
        image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1072&q=80"
      },
      {
        id: 198,
        name: "Jeans",
        brand: "Levis Kids",
        price: 1099,
        originalPrice: 1699,
        discount: 35,
        color: "blue",
        size: "8-9Y",
        image: "https://images.unsplash.com/photo-1519238359922-989348752efb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      }
    ],
    "girls-clothing": [
      {
        id: 17,
        name: "Floral Dress",
        brand: "Carters",
        price: 899,
        originalPrice: 1299,
        discount: 31,
        color: "pink",
        size: "4-5Y",
        image: "https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80"
      },
      {
        id: 18,
        name: "Denim Skirt",
        brand: "GAP Kids",
        price: 799,
        originalPrice: 1199,
        discount: 33,
        color: "blue",
        size: "8-9Y",
        image: "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80"
      },
      {
        id: 199,
        name: "Printed T-Shirt",
        brand: "H&M Kids",
        price: 499,
        originalPrice: 799,
        discount: 38,
        color: "purple",
        size: "6-7Y",
        image: "https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80"
      },
      {
        id: 200,
        name: "Leggings",
        brand: "Zara Kids",
        price: 599,
        originalPrice: 899,
        discount: 33,
        color: "black",
        size: "8-9Y",
        image: "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80"
      },
      {
        id: 201,
        name: "Tutu Skirt",
        brand: "Carters",
        price: 699,
        originalPrice: 999,
        discount: 30,
        color: "pink",
        size: "4-5Y",
        image: "https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80"
      },
      {
        id: 202,
        name: "Denim Jacket",
        brand: "GAP Kids",
        price: 999,
        originalPrice: 1499,
        discount: 33,
        color: "blue",
        size: "8-9Y",
        image: "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80"
      }
    ],
    "infant-clothing": [
      {
        id: 203,
        name: "Bodysuit Set",
        brand: "Carters",
        price: 799,
        originalPrice: 1199,
        discount: 33,
        color: "multi",
        size: "0-3M",
        image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      },
      {
        id: 204,
        name: "Sleep & Play",
        brand: "Gerber",
        price: 599,
        originalPrice: 899,
        discount: 33,
        color: "blue",
        size: "3-6M",
        image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1475&q=80"
      },
      {
        id: 205,
        name: "Romper",
        brand: "H&M Baby",
        price: 699,
        originalPrice: 999,
        discount: 30,
        color: "pink",
        size: "6-9M",
        image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      },
      {
        id: 206,
        name: "Baby Dress",
        brand: "GAP Baby",
        price: 899,
        originalPrice: 1399,
        discount: 36,
        color: "floral",
        size: "9-12M",
        image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1475&q=80"
      },
      {
        id: 207,
        name: "Baby Pants",
        brand: "Carters",
        price: 499,
        originalPrice: 799,
        discount: 38,
        color: "grey",
        size: "6-9M",
        image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      },
      {
        id: 208,
        name: "Baby Sweater",
        brand: "Gerber",
        price: 799,
        originalPrice: 1199,
        discount: 33,
        color: "beige",
        size: "9-12M",
        image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1475&q=80"
      }
    ],
    "kids-footwear": [
      {
        id: 209,
        name: "Kids Sneakers",
        brand: "Nike Kids",
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        color: "blue",
        size: "UK 2",
        image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1112&q=80"
      },
      {
        id: 210,
        name: "Kids Sandals",
        brand: "Adidas Kids",
        price: 899,
        originalPrice: 1399,
        discount: 36,
        color: "pink",
        size: "UK 1",
        image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1112&q=80"
      },
      {
        id: 211,
        name: "Kids School Shoes",
        brand: "Clarks Kids",
        price: 1499,
        originalPrice: 2299,
        discount: 35,
        color: "black",
        size: "UK 3",
        image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1112&q=80"
      },
      {
        id: 212,
        name: "Kids Slip-ons",
        brand: "Puma Kids",
        price: 999,
        originalPrice: 1499,
        discount: 33,
        color: "grey",
        size: "UK 2",
        image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1112&q=80"
      },
      {
        id: 213,
        name: "Kids Boots",
        brand: "Timberland Kids",
        price: 1799,
        originalPrice: 2699,
        discount: 33,
        color: "brown",
        size: "UK 3",
        image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1112&q=80"
      },
      {
        id: 214,
        name: "Kids Sports Shoes",
        brand: "Skechers Kids",
        price: 1399,
        originalPrice: 2099,
        discount: 33,
        color: "blue",
        size: "UK 1",
        image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1112&q=80"
      }
    ],
    "kids-accessories": [
      {
        id: 215,
        name: "Kids Backpack",
        brand: "Skip Hop",
        price: 999,
        originalPrice: 1499,
        discount: 33,
        color: "multi",
        size: "One Size",
        image: "https://images.unsplash.com/photo-1566454825481-9c31a3a35595?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 216,
        name: "Kids Watch",
        brand: "Timex Kids",
        price: 799,
        originalPrice: 1199,
        discount: 33,
        color: "blue",
        size: "One Size",
        image: "https://images.unsplash.com/photo-1566454825481-9c31a3a35595?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 217,
        name: "Kids Sunglasses",
        brand: "Ray-Ban Junior",
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        color: "black",
        size: "One Size",
        image: "https://images.unsplash.com/photo-1566454825481-9c31a3a35595?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 218,
        name: "Kids Cap",
        brand: "Nike Kids",
        price: 599,
        originalPrice: 899,
        discount: 33,
        color: "red",
        size: "One Size",
        image: "https://images.unsplash.com/photo-1566454825481-9c31a3a35595?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 219,
        name: "Kids Lunch Box",
        brand: "Skip Hop",
        price: 899,
        originalPrice: 1399,
        discount: 36,
        color: "green",
        size: "One Size",
        image: "https://images.unsplash.com/photo-1566454825481-9c31a3a35595?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 220,
        name: "Kids Water Bottle",
        brand: "Thermos",
        price: 699,
        originalPrice: 999,
        discount: 30,
        color: "blue",
        size: "One Size",
        image: "https://images.unsplash.com/photo-1566454825481-9c31a3a35595?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      }
    ]
  },
  electronics: {
    "mobiles": [
      {
        id: 19,
        name: "Smartphone X Pro",
        brand: "Apple",
        price: 79999,
        originalPrice: 89999,
        discount: 11,
        color: "black",
        storage: "128GB",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
      },
      {
        id: 20,
        name: "Galaxy S Ultra",
        brand: "Samsung",
        price: 69999,
        originalPrice: 79999,
        discount: 13,
        color: "blue",
        storage: "256GB",
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      },
      {
        id: 221,
        name: "Pixel Pro",
        brand: "Google",
        price: 59999,
        originalPrice: 69999,
        discount: 14,
        color: "white",
        storage: "128GB",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
      },
      {
        id: 222,
        name: "OnePlus Pro",
        brand: "OnePlus",
        price: 49999,
        originalPrice: 59999,
        discount: 17,
        color: "black",
        storage: "256GB",
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      },
      {
        id: 223,
        name: "Mi Note",
        brand: "Xiaomi",
        price: 19999,
        originalPrice: 24999,
        discount: 20,
        color: "blue",
        storage: "128GB",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
      },
      {
        id: 224,
        name: "Realme GT",
        brand: "Realme",
        price: 29999,
        originalPrice: 34999,
        discount: 14,
        color: "silver",
        storage: "256GB",
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      }
    ],
    "laptops": [
      {
        id: 21,
        name: "MacBook Air",
        brand: "Apple",
        price: 89999,
        originalPrice: 99999,
        discount: 10,
        color: "silver",
        processor: "M1",
        image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 22,
        name: "XPS 13",
        brand: "Dell",
        price: 79999,
        originalPrice: 94999,
        discount: 16,
        color: "black",
        processor: "Intel i7",
        image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
      },
      {
        id: 225,
        name: "ThinkPad X1",
        brand: "Lenovo",
        price: 84999,
        originalPrice: 99999,
        discount: 15,
        color: "black",
        processor: "Intel i7",
        image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {        id: 226,
        name: "Spectre x360",
        brand: "HP",
        price: 74999,
        originalPrice: 89999,
        discount: 17,
        color: "silver",
        processor: "Intel i7",
        image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
      },
      {
        id: 227,
        name: "Surface Laptop",
        brand: "Microsoft",
        price: 69999,
        originalPrice: 84999,
        discount: 18,
        color: "platinum",
        processor: "Intel i5",
        image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 228,
        name: "Vivobook",
        brand: "Asus",
        price: 54999,
        originalPrice: 64999,
        discount: 15,
        color: "blue",
        processor: "AMD Ryzen 7",
        image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
      }
    ],
    "headphones": [
      {
        id: 23,
        name: "Noise Cancelling Headphones",
        brand: "Sony",
        price: 24999,
        originalPrice: 29999,
        discount: 17,
        color: "black",
        type: "Over-ear",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1465&q=80"
      },
      {
        id: 24,
        name: "Wireless Earbuds",
        brand: "Apple",
        price: 12999,
        originalPrice: 14999,
        discount: 13,
        color: "white",
        type: "In-ear",
        image: "https://images.unsplash.com/photo-1606741965429-02919c1e0ac1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 229,
        name: "QuietComfort Earbuds",
        brand: "Bose",
        price: 19999,
        originalPrice: 24999,
        discount: 20,
        color: "black",
        type: "In-ear",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1465&q=80"
      },
      {
        id: 230,
        name: "Wireless Headphones",
        brand: "JBL",
        price: 9999,
        originalPrice: 12999,
        discount: 23,
        color: "blue",
        type: "Over-ear",
        image: "https://images.unsplash.com/photo-1606741965429-02919c1e0ac1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 231,
        name: "Gaming Headset",
        brand: "SteelSeries",
        price: 14999,
        originalPrice: 17999,
        discount: 17,
        color: "black",
        type: "Over-ear",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1465&q=80"
      },
      {
        id: 232,
        name: "Neckband Earphones",
        brand: "OnePlus",
        price: 4999,
        originalPrice: 5999,
        discount: 17,
        color: "black",
        type: "In-ear",
        image: "https://images.unsplash.com/photo-1606741965429-02919c1e0ac1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      }
    ],
    "tablets": [
      {
        id: 233,
        name: "iPad Pro",
        brand: "Apple",
        price: 69999,
        originalPrice: 79999,
        discount: 13,
        color: "silver",
        storage: "256GB",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
      },
      {
        id: 234,
        name: "Galaxy Tab S",
        brand: "Samsung",
        price: 49999,
        originalPrice: 59999,
        discount: 17,
        color: "black",
        storage: "128GB",
        image: "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
      },
      {
        id: 235,
        name: "Surface Pro",
        brand: "Microsoft",
        price: 79999,
        originalPrice: 94999,
        discount: 16,
        color: "platinum",
        storage: "256GB",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
      },
      {
        id: 236,
        name: "MediaPad",
        brand: "Huawei",
        price: 29999,
        originalPrice: 34999,
        discount: 14,
        color: "blue",
        storage: "128GB",
        image: "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
      },
      {
        id: 237,
        name: "Lenovo Tab",
        brand: "Lenovo",
        price: 19999,
        originalPrice: 24999,
        discount: 20,
        color: "grey",
        storage: "64GB",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
      },
      {
        id: 238,
        name: "Mi Pad",
        brand: "Xiaomi",
        price: 24999,
        originalPrice: 29999,
        discount: 17,
        color: "silver",
        storage: "128GB",
        image: "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
      }
    ],
    "cameras": [
      {
        id: 239,
        name: "DSLR Camera",
        brand: "Canon",
        price: 49999,
        originalPrice: 59999,
        discount: 17,
        color: "black",
        megapixels: "24MP",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1638&q=80"
      },
      {
        id: 240,
        name: "Mirrorless Camera",
        brand: "Sony",
        price: 69999,
        originalPrice: 79999,
        discount: 13,
        color: "black",
        megapixels: "30MP",
        image: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 241,
        name: "Point and Shoot Camera",
        brand: "Nikon",
        price: 19999,
        originalPrice: 24999,
        discount: 20,
        color: "silver",
        megapixels: "20MP",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1638&q=80"
      },
      {
        id: 242,
        name: "Action Camera",
        brand: "GoPro",
        price: 29999,
        originalPrice: 34999,
        discount: 14,
        color: "black",
        megapixels: "12MP",
        image: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 243,
        name: "Instant Camera",
        brand: "Fujifilm",
        price: 9999,
        originalPrice: 11999,
        discount: 17,
        color: "pink",
        type: "Instant Film",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1638&q=80"
      },
      {
        id: 244,
        name: "Professional DSLR",
        brand: "Canon",
        price: 149999,
        originalPrice: 179999,
        discount: 17,
        color: "black",
        megapixels: "45MP",
        image: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      }
    ],
    "smart-watches": [
      {
        id: 245,
        name: "Apple Watch",
        brand: "Apple",
        price: 29999,
        originalPrice: 34999,
        discount: 14,
        color: "silver",
        size: "44mm",
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80"
      },
      {
        id: 246,
        name: "Galaxy Watch",
        brand: "Samsung",
        price: 19999,
        originalPrice: 24999,
        discount: 20,
        color: "black",
        size: "42mm",
        image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1527&q=80"
      },
      {
        id: 247,
        name: "Fitbit Versa",
        brand: "Fitbit",
        price: 14999,
        originalPrice: 17999,
        discount: 17,
        color: "rose gold",
        size: "40mm",
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80"
      },
      {
        id: 248,
        name: "Mi Smart Band",
        brand: "Xiaomi",
        price: 2999,
        originalPrice: 3499,
        discount: 14,
        color: "black",
        size: "One Size",
        image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1527&q=80"
      },
      {
        id: 249,
        name: "Fossil Smartwatch",
        brand: "Fossil",
        price: 17999,
        originalPrice: 21999,
        discount: 18,
        color: "brown",
        size: "44mm",
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80"
      },
      {
        id: 250,
        name: "Garmin Forerunner",
        brand: "Garmin",
        price: 24999,
        originalPrice: 29999,
        discount: 17,
        color: "black",
        size: "42mm",
        image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1527&q=80"
      }
    ]
  },
  "home-appliances": {
    "microwaves": [
      {
        id: 25,
        name: "Convection Microwave Oven",
        brand: "Samsung",
        price: 9999,
        originalPrice: 12999,
        discount: 23,
        color: "black",
        capacity: "28L",
        image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      },
      {
        id: 26,
        name: "Solo Microwave Oven",
        brand: "LG",
        price: 5999,
        originalPrice: 7999,
        discount: 25,
        color: "silver",
        capacity: "20L",
        image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80"
      },
      {
        id: 251,
        name: "Grill Microwave Oven",
        brand: "IFB",
        price: 8999,
        originalPrice: 11999,
        discount: 25,
        color: "black",
        capacity: "25L",
        image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      },
      {
        id: 252,
        name: "Built-in Microwave",
        brand: "Bosch",
        price: 14999,
        originalPrice: 19999,
        discount: 25,
        color: "stainless steel",
        capacity: "32L",
        image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80"
      },
      {
        id: 253,
        name: "Countertop Microwave",
        brand: "Whirlpool",
        price: 6999,
        originalPrice: 8999,
        discount: 22,
        color: "white",
        capacity: "22L",
        image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      },
      {
        id: 254,
        name: "Smart Microwave",
        brand: "Samsung",
        price: 12999,
        originalPrice: 16999,
        discount: 24,
        color: "black",
        capacity: "30L",
        image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80"
      }
    ],
    "air-conditioners": [
      {
        id: 27,
        name: "Split AC 1.5 Ton",
        brand: "Daikin",
        price: 32999,
        originalPrice: 42999,
        discount: 23,
        color: "white",
        energyRating: "5 Star",
        image: "https://images.unsplash.com/photo-1628413993904-94ecb60f1239?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
      },
      {
        id: 28,
        name: "Window AC 1 Ton",
        brand: "Voltas",
        price: 24999,
        originalPrice: 29999,
        discount: 17,
        color: "white",
        energyRating: "3 Star",
        image: "https://images.unsplash.com/photo-1628413993904-94ecb60f1239?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
      },
      {
        id: 255,
        name: "Inverter Split AC 2 Ton",
        brand: "LG",
        price: 39999,
        originalPrice: 49999,
        discount: 20,
        color: "white",
        energyRating: "5 Star",
        image: "https://images.unsplash.com/photo-1628413993904-94ecb60f1239?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
      },
      {
        id: 256,
        name: "Portable AC 1 Ton",
        brand: "Blue Star",
        price: 29999,
        originalPrice: 34999,
        discount: 14,
        color: "white",
        energyRating: "3 Star",
        image: "https://images.unsplash.com/photo-1628413993904-94ecb60f1239?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
      },
      {
        id: 257,
        name: "Cassette AC 2 Ton",
        brand: "Carrier",
        price: 49999,
        originalPrice: 59999,
        discount: 17,
        color: "white",
        energyRating: "4 Star",
        image: "https://images.unsplash.com/photo-1628413993904-94ecb60f1239?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
      },
      {
        id: 258,
        name: "Dual Inverter AC 1.5 Ton",
        brand: "Hitachi",
        price: 34999,
        originalPrice: 44999,
        discount: 22,
        color: "white",
        energyRating: "5 Star",
        image: "https://images.unsplash.com/photo-1628413993904-94ecb60f1239?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
      }
    ],
    "refrigerators": [
      {
        id: 259,
        name: "Double Door Refrigerator",
        brand: "Samsung",
        price: 29999,
        originalPrice: 34999,
        discount: 14,
        color: "silver",
        capacity: "300L",
        image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 260,
        name: "Single Door Refrigerator",
        brand: "LG",
        price: 19999,
        originalPrice: 24999,
        discount: 20,
        color: "red",
        capacity: "190L",
        image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
      },
      {
        id: 261,
        name: "Side by Side Refrigerator",
        brand: "Whirlpool",
        price: 49999,
        originalPrice: 59999,
        discount: 17,
        color: "black",
        capacity: "570L",
        image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 262,
        name: "French Door Refrigerator",
        brand: "Bosch",
        price: 69999,
        originalPrice: 84999,
        discount: 18,
        color: "stainless steel",
        capacity: "650L",
        image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
      },
      {
        id: 263,
        name: "Mini Refrigerator",
        brand: "Haier",
        price: 9999,
        originalPrice: 12999,
        discount: 23,
        color: "black",
        capacity: "90L",
        image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 264,
        name: "Bottom Freezer Refrigerator",
        brand: "Godrej",
        price: 24999,
        originalPrice: 29999,
        discount: 17,
        color: "silver",
        capacity: "330L",
        image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
      }
    ],
    "washing-machines": [
      {
        id: 265,
        name: "Front Load Washing Machine",
        brand: "LG",
        price: 29999,
        originalPrice: 34999,
        discount: 14,
        color: "silver",
        capacity: "8kg",
        image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      },
      {
        id: 266,
        name: "Top Load Washing Machine",
        brand: "Samsung",
        price: 19999,
        originalPrice: 24999,
        discount: 20,
        color: "white",
        capacity: "7kg",
        image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      },
      {
        id: 267,
        name: "Semi-Automatic Washing Machine",
        brand: "Whirlpool",
        price: 12999,
        originalPrice: 15999,
        discount: 19,
        color: "grey",
        capacity: "8.5kg",
        image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      },
      {
        id: 268,
        name: "Washer Dryer Combo",
        brand: "IFB",
        price: 39999,
        originalPrice: 49999,
        discount: 20,
        color: "silver",
        capacity: "8kg/5kg",
        image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      },
      {
        id: 269,
        name: "Fully Automatic Washing Machine",
        brand: "Bosch",
        price: 34999,
        originalPrice: 44999,
        discount: 22,
        color: "white",
        capacity: "9kg",
        image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      },
      {
        id: 270,
        name: "Compact Washing Machine",
        brand: "Haier",
        price: 14999,
        originalPrice: 19999,
        discount: 25,
        color: "white",
        capacity: "6kg",
        image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      }
    ],
    "televisions": [
      {
        id: 271,
        name: "4K Smart TV 55 inch",
        brand: "Samsung",
        price: 49999,
        originalPrice: 59999,
        discount: 17,
        color: "black",
        resolution: "4K Ultra HD",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 272,
        name: "Full HD TV 43 inch",
        brand: "LG",
        price: 29999,
        originalPrice: 34999,
        discount: 14,
        color: "black",
        resolution: "Full HD",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 273,
        name: "OLED TV 65 inch",
        brand: "Sony",
        price: 149999,
        originalPrice: 179999,
        discount: 17,
        color: "black",
        resolution: "4K Ultra HD",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 274,
        name: "QLED TV 55 inch",
        brand: "Samsung",
        price: 69999,
        originalPrice: 84999,
        discount: 18,
        color: "black",
        resolution: "4K Ultra HD",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 275,
        name: "HD Ready TV 32 inch",
        brand: "Mi",
        price: 14999,
        originalPrice: 19999,
        discount: 25,
        color: "black",
        resolution: "HD Ready",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 276,
        name: "Android TV 50 inch",
        brand: "OnePlus",
        price: 39999,
        originalPrice: 49999,
        discount: 20,
        color: "black",
        resolution: "4K Ultra HD",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      }
    ],
    "kitchen-appliances": [
      {
        id: 277,
        name: "Mixer Grinder",
        brand: "Philips",
        price: 2999,
        originalPrice: 3999,
        discount: 25,
        color: "white",
        wattage: "750W",
        image: "https://images.unsplash.com/photo-1585515320310-259814833e62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
      },
      {
        id: 278,
        name: "Electric Kettle",
        brand: "Prestige",
        price: 999,
        originalPrice: 1499,
        discount: 33,
        color: "silver",
        capacity: "1.5L",
        image: "https://images.unsplash.com/photo-1594226801341-41427b4e5c22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80"
      },
      {
        id: 279,
        name: "Food Processor",
        brand: "Morphy Richards",
        price: 4999,
        originalPrice: 6999,
        discount: 29,
        color: "black",
        wattage: "1000W",
        image: "https://images.unsplash.com/photo-1585515320310-259814833e62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
      },
      {
        id: 280,
        name: "Induction Cooktop",
        brand: "Prestige",
        price: 2499,
        originalPrice: 3499,
        discount: 29,
        color: "black",
        wattage: "1800W",
        image: "https://images.unsplash.com/photo-1594226801341-41427b4e5c22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80"
      },
      {
        id: 281,
        name: "Hand Blender",
        brand: "Philips",
        price: 1999,
        originalPrice: 2999,
        discount: 33,
        color: "white",
        wattage: "300W",
        image: "https://images.unsplash.com/photo-1585515320310-259814833e62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
      },
      {
        id: 282,
        name: "Toaster",
        brand: "Morphy Richards",
        price: 1499,
        originalPrice: 1999,
        discount: 25,
        color: "red",
        slices: "2 Slice",
        image: "https://images.unsplash.com/photo-1594226801341-41427b4e5c22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80"
      }
    ]
  },
  "foot-wear": {
    "sneakers": [
      {        id: 29,
        name: "Running Sneakers",
        brand: "Nike",
        price: 4999,
        originalPrice: 6999,
        discount: 29,
        color: "black",
        size: "UK 9",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 30,
        name: "Casual Sneakers",
        brand: "Adidas",
        price: 3999,
        originalPrice: 5499,
        discount: 27,
        color: "white",
        size: "UK 8",
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
      },
      {
        id: 283,
        name: "Basketball Sneakers",
        brand: "Jordan",
        price: 7999,
        originalPrice: 9999,
        discount: 20,
        color: "red",
        size: "UK 10",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 284,
        name: "Skate Sneakers",
        brand: "Vans",
        price: 3499,
        originalPrice: 4999,
        discount: 30,
        color: "black",
        size: "UK 8",
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
      },
      {
        id: 285,
        name: "Lifestyle Sneakers",
        brand: "Puma",
        price: 2999,
        originalPrice: 4499,
        discount: 33,
        color: "blue",
        size: "UK 9",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 286,
        name: "Tennis Sneakers",
        brand: "New Balance",
        price: 4499,
        originalPrice: 5999,
        discount: 25,
        color: "white",
        size: "UK 8",
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
      }
    ],
    "formal-shoes": [
      {
        id: 31,
        name: "Oxford Shoes",
        brand: "Clarks",
        price: 3999,
        originalPrice: 5999,
        discount: 33,
        color: "brown",
        size: "UK 9",
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 32,
        name: "Derby Shoes",
        brand: "Hush Puppies",
        price: 4499,
        originalPrice: 5999,
        discount: 25,
        color: "black",
        size: "UK 8",
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 287,
        name: "Brogue Shoes",
        brand: "Allen Solly",
        price: 3499,
        originalPrice: 4999,
        discount: 30,
        color: "tan",
        size: "UK 9",
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 288,
        name: "Monk Strap Shoes",
        brand: "Louis Philippe",
        price: 4999,
        originalPrice: 6999,
        discount: 29,
        color: "brown",
        size: "UK 8",
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 289,
        name: "Loafers",
        brand: "Clarks",
        price: 3999,
        originalPrice: 5499,
        discount: 27,
        color: "black",
        size: "UK 9",
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 290,
        name: "Formal Slip-ons",
        brand: "Bata",
        price: 2499,
        originalPrice: 3499,
        discount: 29,
        color: "brown",
        size: "UK 8",
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      }
    ],
    "sandals": [
      {
        id: 291,
        name: "Leather Sandals",
        brand: "Bata",
        price: 1499,
        originalPrice: 1999,
        discount: 25,
        color: "brown",
        size: "UK 9",
        image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 292,
        name: "Flip Flops",
        brand: "Crocs",
        price: 999,
        originalPrice: 1499,
        discount: 33,
        color: "blue",
        size: "UK 8",
        image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 293,
        name: "Sports Sandals",
        brand: "Adidas",
        price: 1999,
        originalPrice: 2999,
        discount: 33,
        color: "black",
        size: "UK 9",
        image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 294,
        name: "Casual Sandals",
        brand: "Woodland",
        price: 1799,
        originalPrice: 2499,
        discount: 28,
        color: "olive",
        size: "UK 8",
        image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 295,
        name: "Comfort Sandals",
        brand: "Relaxo",
        price: 699,
        originalPrice: 999,
        discount: 30,
        color: "brown",
        size: "UK 9",
        image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 296,
        name: "Slides",
        brand: "Nike",
        price: 1499,
        originalPrice: 1999,
        discount: 25,
        color: "black",
        size: "UK 8",
        image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      }
    ],
    "boots": [
      {
        id: 297,
        name: "Leather Boots",
        brand: "Timberland",
        price: 5999,
        originalPrice: 7999,
        discount: 25,
        color: "brown",
        size: "UK 9",
        image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 298,
        name: "Chelsea Boots",
        brand: "Clarks",
        price: 4999,
        originalPrice: 6999,
        discount: 29,
        color: "black",
        size: "UK 8",
        image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 299,
        name: "Hiking Boots",
        brand: "Woodland",
        price: 3999,
        originalPrice: 5499,
        discount: 27,
        color: "olive",
        size: "UK 9",
        image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 300,
        name: "Desert Boots",
        brand: "Clarks",
        price: 4499,
        originalPrice: 5999,
        discount: 25,
        color: "tan",
        size: "UK 8",
        image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 301,
        name: "Combat Boots",
        brand: "Dr. Martens",
        price: 7999,
        originalPrice: 9999,
        discount: 20,
        color: "black",
        size: "UK 9",
        image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 302,
        name: "Ankle Boots",
        brand: "Hush Puppies",
        price: 3999,
        originalPrice: 5499,
        discount: 27,
        color: "brown",
        size: "UK 8",
        image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      }
    ],
    "sports-shoes": [
      {
        id: 303,
        name: "Running Shoes",
        brand: "Nike",
        price: 5999,
        originalPrice: 7999,
        discount: 25,
        color: "blue",
        size: "UK 9",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 304,
        name: "Training Shoes",
        brand: "Adidas",
        price: 4999,
        originalPrice: 6999,
        discount: 29,
        color: "black",
        size: "UK 8",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 305,
        name: "Basketball Shoes",
        brand: "Under Armour",
        price: 6999,
        originalPrice: 8999,
        discount: 22,
        color: "red",
        size: "UK 9",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 306,
        name: "Tennis Shoes",
        brand: "Asics",
        price: 4499,
        originalPrice: 5999,
        discount: 25,
        color: "white",
        size: "UK 8",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 307,
        name: "Football Shoes",
        brand: "Puma",
        price: 3999,
        originalPrice: 5499,
        discount: 27,
        color: "green",
        size: "UK 9",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 308,
        name: "Cricket Shoes",
        brand: "New Balance",
        price: 4999,
        originalPrice: 6499,
        discount: 23,
        color: "white",
        size: "UK 8",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      }
    ]
  },
  books: {
    "mystery": [
      {
        id: 33,
        name: "The Silent Patient",
        brand: "Alex Michaelides",
        price: 299,
        originalPrice: 499,
        discount: 40,
        format: "Paperback",
        pages: 336,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 34,
        name: "Gone Girl",
        brand: "Gillian Flynn",
        price: 349,
        originalPrice: 599,
        discount: 42,
        format: "Paperback",
        pages: 432,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 309,
        name: "The Girl on the Train",
        brand: "Paula Hawkins",
        price: 279,
        originalPrice: 399,
        discount: 30,
        format: "Paperback",
        pages: 320,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 310,
        name: "The Da Vinci Code",
        brand: "Dan Brown",
        price: 399,
        originalPrice: 599,
        discount: 33,
        format: "Paperback",
        pages: 592,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 311,
        name: "And Then There Were None",
        brand: "Agatha Christie",
        price: 249,
        originalPrice: 399,
        discount: 38,
        format: "Paperback",
        pages: 256,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 312,
        name: "The Woman in the Window",
        brand: "A.J. Finn",
        price: 329,
        originalPrice: 499,
        discount: 34,
        format: "Paperback",
        pages: 448,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      }
    ],
    "self-help": [
      {
        id: 35,
        name: "Atomic Habits",
        brand: "James Clear",
        price: 399,
        originalPrice: 599,
        discount: 33,
        format: "Hardcover",
        pages: 320,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 36,
        name: "The 7 Habits of Highly Effective People",
        brand: "Stephen R. Covey",
        price: 349,
        originalPrice: 499,
        discount: 30,
        format: "Paperback",
        pages: 432,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 313,
        name: "Think and Grow Rich",
        brand: "Napoleon Hill",
        price: 249,
        originalPrice: 399,
        discount: 38,
        format: "Paperback",
        pages: 320,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 314,
        name: "How to Win Friends and Influence People",
        brand: "Dale Carnegie",
        price: 299,
        originalPrice: 399,
        discount: 25,
        format: "Paperback",
        pages: 288,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 315,
        name: "The Power of Now",
        brand: "Eckhart Tolle",
        price: 349,
        originalPrice: 499,
        discount: 30,
        format: "Paperback",
        pages: 256,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 316,
        name: "Rich Dad Poor Dad",
        brand: "Robert T. Kiyosaki",
        price: 299,
        originalPrice: 399,
        discount: 25,
        format: "Paperback",
        pages: 336,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      }
    ],
    "fiction": [
      {
        id: 317,
        name: "To Kill a Mockingbird",
        brand: "Harper Lee",
        price: 299,
        originalPrice: 399,
        discount: 25,
        format: "Paperback",
        pages: 336,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 318,
        name: "1984",
        brand: "George Orwell",
        price: 249,
        originalPrice: 349,
        discount: 29,
        format: "Paperback",
        pages: 328,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 319,
        name: "The Great Gatsby",
        brand: "F. Scott Fitzgerald",
        price: 199,
        originalPrice: 299,
        discount: 33,
        format: "Paperback",
        pages: 180,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 320,
        name: "Pride and Prejudice",
        brand: "Jane Austen",
        price: 249,
        originalPrice: 349,
        discount: 29,
        format: "Paperback",
        pages: 432,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 321,
        name: "The Alchemist",
        brand: "Paulo Coelho",
        price: 199,
        originalPrice: 299,
        discount: 33,
        format: "Paperback",
        pages: 208,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 322,
        name: "Harry Potter and the Philosopher's Stone",
        brand: "J.K. Rowling",
        price: 349,
        originalPrice: 499,
        discount: 30,
        format: "Paperback",
        pages: 320,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      }
    ],
    "biography": [
      {
        id: 323,
        name: "Steve Jobs",
        brand: "Walter Isaacson",
        price: 499,
        originalPrice: 699,
        discount: 29,
        format: "Hardcover",
        pages: 656,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 324,
        name: "Becoming",
        brand: "Michelle Obama",
        price: 599,
        originalPrice: 799,
        discount: 25,
        format: "Hardcover",
        pages: 448,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 325,
        name: "The Diary of a Young Girl",
        brand: "Anne Frank",
        price: 199,
        originalPrice: 299,
        discount: 33,
        format: "Paperback",
        pages: 352,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 326,
        name: "Wings of Fire",
        brand: "A.P.J. Abdul Kalam",
        price: 249,
        originalPrice: 349,
        discount: 29,
        format: "Paperback",
        pages: 180,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 327,
        name: "Elon Musk",
        brand: "Ashlee Vance",
        price: 399,
        originalPrice: 599,
        discount: 33,
        format: "Paperback",
        pages: 400,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 328,
        name: "The Autobiography of Benjamin Franklin",
        brand: "Benjamin Franklin",
        price: 199,
        originalPrice: 299,
        discount: 33,
        format: "Paperback",
        pages: 160,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      }
    ]
  },
  bags: {
    "backpacks": [
      {
        id: 37,
        name: "Laptop Backpack",
        brand: "American Tourister",
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        color: "black",
        capacity: "30L",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 38,
        name: "Hiking Backpack",
        brand: "Wildcraft",
        price: 1999,
        originalPrice: 2999,
        discount: 33,
        color: "green",
        capacity: "45L",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 329,
        name: "School Backpack",
        brand: "Skybags",
        price: 999,
        originalPrice: 1499,
        discount: 33,
        color: "blue",
        capacity: "25L",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 330,
        name: "Travel Backpack",
        brand: "VIP",
        price: 1799,
        originalPrice: 2499,
        discount: 28,
        color: "grey",
        capacity: "40L",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 331,
        name: "Anti-theft Backpack",
        brand: "Kaka",
        price: 1499,
        originalPrice: 2299,
        discount: 35,
        color: "black",
        capacity: "28L",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 332,
        name: "Casual Daypack",
        brand: "Fastrack",
        price: 899,
        originalPrice: 1299,
        discount: 31,
        color: "red",
        capacity: "20L",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      }
    ],
    "handbags": [
      {
        id: 39,
        name: "Leather Tote Bag",
        brand: "Hidesign",
        price: 2999,
        originalPrice: 4499,
        discount: 33,
        color: "brown",
        material: "Genuine Leather",
        image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
      },
      {
        id: 40,
        name: "Crossbody Bag",
        brand: "Lavie",
        price: 1499,
        originalPrice: 2299,
        discount: 35,
        color: "black",
        material: "Synthetic Leather",
        image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
      },
      {
        id: 333,
        name: "Shoulder Bag",
        brand: "Baggit",
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        color: "blue",
        material: "Synthetic Leather",
        image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
      },
      {
        id: 334,
        name: "Clutch Bag",
        brand: "Caprese",
        price: 999,
        originalPrice: 1499,
        discount: 33,
        color: "gold",
        material: "Synthetic",
        image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
      },
      {
        id: 335,
        name: "Hobo Bag",
        brand: "Hidesign",
        price: 2499,
        originalPrice: 3499,
        discount: 29,
        color: "brown",
        material: "Genuine Leather",
        image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
      },
      {
        id: 336,
        name: "Satchel Bag",
        brand: "Lavie",
        price: 1799,
        originalPrice: 2499,
        discount: 28,
        color: "red",
        material: "Synthetic Leather",
        image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
      }
    ],
    "travel-bags": [
      {
        id: 337,
        name: "Duffle Bag",
        brand: "American Tourister",
        price: 1999,
        originalPrice: 2999,
        discount: 33,
        color: "blue",
        capacity: "60L",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 338,
        name: "Trolley Bag",
        brand: "Safari",
        price: 2999,
        originalPrice: 4499,
        discount: 33,
        color: "black",
        capacity: "75L",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 339,
        name: "Cabin Luggage",
        brand: "Skybags",
        price: 2499,
        originalPrice: 3499,
        discount: 29,
        color: "red",
        capacity: "35L",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 340,
        name: "Check-in Luggage",
        brand: "VIP",
        price: 3999,
        originalPrice: 5499,
        discount: 27,
        color: "grey",
        capacity: "90L",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 341,
        name: "Weekender Bag",
        brand: "Wildcraft",
        price: 1799,
        originalPrice: 2499,
        discount: 28,
        color: "green",
        capacity: "50L",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 342,
        name: "Garment Bag",
        brand: "Samsonite",
        price: 4999,
        originalPrice: 6999,
        discount: 29,
        color: "black",
        capacity: "40L",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      }
    ],
    "wallets": [
      {
        id: 343,
        name: "Leather Wallet",
        brand: "Hidesign",
        price: 999,
        originalPrice: 1499,
        discount: 33,
        color: "brown",
        material: "Genuine Leather",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      },
      {
        id: 344,
        name: "Card Holder",
        brand: "Woodland",
        price: 499,
        originalPrice: 799,
        discount: 38,
        color: "black",
        material: "Genuine Leather",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      },
      {
        id: 345,
        name: "Bifold Wallet",
        brand: "Tommy Hilfiger",
        price: 1499,
        originalPrice: 2299,
        discount: 35,
        color: "navy",
        material: "Genuine Leather",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      },
      {
        id: 346,
        name: "Trifold Wallet",
        brand: "Levis",
        price: 899,
        originalPrice: 1299,
        discount: 31,
        color: "brown",
        material: "Synthetic Leather",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      },
      {
        id: 347,
        name: "Money Clip",
        brand: "Cross",
        price: 799,
        originalPrice: 1199,
        discount: 33,
        color: "silver",
        material: "Metal",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      },
      {
        id: 348,
        name: "Passport Holder",
        brand: "Hidesign",
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        color: "black",
        material: "Genuine Leather",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      }
    ]
  },
  sports: {
    "balls": [
      {
        id: 41,
        name: "Cricket Ball",
        brand: "SG",
        price: 299,
        originalPrice: 399,
        discount: 25,
        color: "red",
        type: "Leather",
        image: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1468&q=80"
      },
      {
        id: 42,
        name: "Football",
        brand: "Nivia",
        price: 599,
        originalPrice: 799,
        discount: 25,
        color: "white",
        type: "Synthetic",
        image: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 349,
        name: "Basketball",
        brand: "Spalding",
        price: 899,
        originalPrice: 1299,
        discount: 31,
        color: "orange",
        type: "Synthetic",
        image: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 350,
        name: "Tennis Ball",
        brand: "Wilson",
        price: 199,
        originalPrice: 299,
        discount: 33,
        color: "yellow",
        type: "Felt",
        image: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 351,
        name: "Volleyball",
        brand: "Cosco",
        price: 499,
        originalPrice: 699,
        discount: 29,
        color: "white",
        type: "Synthetic",
        image: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 352,
        name: "Hockey Ball",
        brand: "Slazenger",
        price: 249,
        originalPrice: 349,
        discount: 29,
        color: "white",
        type: "Plastic",
        image: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      }
    ],
    "rackets": [
      {
        id: 43,
        name: "Tennis Racket",
        brand: "Wilson",
        price: 2999,
        originalPrice: 3999,
        discount: 25,
        color: "black",
        material: "Graphite",
        image: "https://images.unsplash.com/photo-1617083934555-ac7d9cda2b1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 44,
        name: "Badminton Racket",
        brand: "Yonex",
        price: 1999,
        originalPrice: 2499,
        discount: 20,
        color: "blue",
        material: "Aluminum",
        image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 353,
        name: "Squash Racket",
        brand: "Head",
        price: 2499,
        originalPrice: 3499,
        discount: 29,
        color: "black",
        material: "Graphite",
        image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 354,
        name: "Table Tennis Racket",
        brand: "Stiga",
        price: 999,
        originalPrice: 1499,
        discount: 33,
        color: "red",
        material: "Wood",
        image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 355,
        name: "Professional Badminton Racket",
        brand: "Li-Ning",
        price: 3499,
        originalPrice: 4999,
        discount: 30,
        color: "white",
        material: "Carbon Fiber",
        image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 356,
        name: "Junior Tennis Racket",
        brand: "Babolat",
        price: 1499,
        originalPrice: 1999,
        discount: 25,
        color: "blue",
        material: "Aluminum",
        image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      }
    ],
    "fitness-equipment": [
      {
        id: 357,
        name: "Yoga Mat",
        brand: "Adidas",
        price: 999,
        originalPrice: 1499,
        discount: 33,
        color: "purple",
        thickness: "6mm",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 358,
        name: "Dumbbells Set",
        brand: "Reebok",
        price: 1999,
        originalPrice: 2999,
        discount: 33,
        weight: "10kg",
        material: "Cast Iron",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 359,
        name: "Resistance Bands",
        brand: "Nike",
        price: 699,
        originalPrice: 999,
        discount: 30,
        pieces: "5 Piece Set",
        material: "Latex",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 360,
        name: "Skipping Rope",
        brand: "Puma",
        price: 399,
        originalPrice: 599,
        discount: 33,
        material: "PVC",
        length: "Adjustable",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 361,
        name: "Exercise Ball",
        brand: "Reebok",
        price: 899,
        originalPrice: 1299,
        discount: 31,
        diameter: "65cm",
        material: "PVC",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 362,
        name: "Push-up Bars",
        brand: "Nike",
        price: 599,
        originalPrice: 799,
        discount: 25,
        material: "Steel",
        grip: "Foam",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      }
    ],
    "sportswear": [
      {
        id: 363,
        name: "Men's Running T-Shirt",
        brand: "Nike",
        price: 999,
        originalPrice: 1499,
        discount: 33,
        color: "blue",
        size: "M",
        image: "https://images.unsplash.com/photo-1581612129334-551ccd2c6a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 364,
        name: "Women's Yoga Pants",
        brand: "Adidas",
        price: 1499,
        originalPrice: 2299,
        discount: 35,
        color: "black",
        size: "S",
        image: "https://images.unsplash.com/photo-1581612129334-551ccd2c6a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 365,
        name: "Men's Track Pants",
        brand: "Puma",
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        color: "grey",
        size: "L",
        image: "https://images.unsplash.com/photo-1581612129334-551ccd2c6a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 366,
        name: "Women's Sports Bra",
        brand: "Under Armour",
        price: 899,
        originalPrice: 1299,
        discount: 31,
        color: "pink",
        size: "M",
        image: "https://images.unsplash.com/photo-1581612129334-551ccd2c6a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 367,
        name: "Men's Compression Shorts",
        brand: "Nike",
        price: 799,
        originalPrice: 1199,
        discount: 33,
        color: "black",
        size: "M",
        image: "https://images.unsplash.com/photo-1581612129334-551ccd2c6a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      {
        id: 368,
        name: "Women's Running Shorts",
        brand: "Adidas",
        price: 699,
        originalPrice: 999,
        discount: 30,
        color: "blue",
        size: "S",
        image: "https://images.unsplash.com/photo-1581612129334-551ccd2c6a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      }
    ]
  },
  kitchen: {
    "pans": [
      {
        id: 45,
        name: "Non-Stick Frying Pan",
        brand: "Prestige",
        price: 799,
        originalPrice: 1299,
        discount: 38,
        color: "black",
        size: "24cm",
        image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      },
      {
        id: 46,
        name: "Cast Iron Skillet",
        brand: "Lodge",
        price: 1999,
        originalPrice: 2499,
        discount: 20,
        color: "black",
        size: "26cm",
        image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      },
      {
        id: 369,
        name: "Stainless Steel Saucepan",
        brand: "Hawkins",
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        color: "silver",
        size: "20cm",
        image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      },
      {
        id: 370,
        name: "Wok",
        brand: "Prestige",
        price: 999,
        originalPrice: 1499,
        discount: 33,
        color: "black",
        size: "30cm",
        image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      },
      {
        id: 371,
        name: "Grill Pan",
        brand: "Wonderchef",
        price: 1499,
        originalPrice: 2299,
        discount: 35,
        color: "black",
        size: "28cm",
        image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      },
      {
        id: 372,
        name: "Kadai",
        brand: "Hawkins",
        price: 899,
        originalPrice: 1299,
        discount: 31,
        color: "silver",
        size: "26cm",
        image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      }
    ],
    "knives": [
      {
        id: 47,
        name: "Chef's Knife",
        brand: "Victorinox",
        price: 1499,
        originalPrice: 1999,
        discount: 25,
        material: "Stainless Steel",
        size: "8 inch",
        image: "https://images.unsplash.com/photo-1566454825481-9c31a3a35595?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 48,
        name: "Knife Set",
        brand: "Prestige",
        price: 1999,
        originalPrice: 2999,
        discount: 33,
        material: "Stainless Steel",
        pieces: "5 Piece Set",
        image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 373,
        name: "Bread Knife",
        brand: "Victorinox",
        price: 999,
        originalPrice: 1499,
        discount: 33,
        material: "Stainless Steel",
        size: "10 inch",
        image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 374,
        name: "Paring Knife",
        brand: "Wonderchef",
        price: 499,
        originalPrice: 799,
        discount: 38,
        material: "Stainless Steel",
        size: "3.5 inch",
        image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 375,
        name: "Santoku Knife",
        brand: "Global",
        price: 2999,
        originalPrice: 3999,
        discount: 25,
        material: "High Carbon Steel",
        size: "7 inch",
        image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 376,
        name: "Cleaver",
        brand: "Prestige",
        price: 799,
        originalPrice: 1199,
        discount: 33,
        material: "Stainless Steel",
        size: "6 inch",
        image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      }
    ],
    "cookware": [
      {
        id: 377,
        name: "Pressure Cooker",
        brand: "Hawkins",
        price: 1999,
        originalPrice: 2999,
        discount: 33,
        material: "Aluminum",
        capacity: "5L",
        image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      },
      {
        id: 378,
        name: "Cookware Set",
        brand: "Prestige",
        price: 3999,
        originalPrice: 5999,
        discount: 33,
        material: "Non-Stick",
        pieces: "5 Piece Set",
        image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      },
      {
        id: 379,
        name: "Stainless Steel Pot",
        brand: "Wonderchef",
        price: 1499,
        originalPrice: 2299,
        discount: 35,
        material: "Stainless Steel",
        capacity: "3L",
        image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      },
      {
        id: 380,
        name: "Dutch Oven",
        brand: "Le Creuset",
        price: 9999,
        originalPrice: 12999,
        discount: 23,
        material: "Cast Iron",
        capacity: "5.5L",
        image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      },
      {
        id: 381,
        name: "Steamer",
        brand: "Prestige",
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        material: "Stainless Steel",
        capacity: "2L",
        image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      },
      {
        id: 382,
        name: "Tawa",
        brand: "Hawkins",
        price: 699,
        originalPrice: 999,
        discount: 30,
        material: "Non-Stick",
        size: "28cm",
        image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      }
    ],
    "kitchen-tools": [
      {
        id: 383,
        name: "Measuring Cups",
        brand: "Tupperware",
        price: 399,
        originalPrice: 599,
        discount: 33,
        material: "Plastic",
        pieces: "4 Piece Set",
        image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 384,
        name: "Spatula Set",
        brand: "Wonderchef",
        price: 499,
        originalPrice: 799,
        discount: 38,
        material: "Silicone",
        pieces: "3 Piece Set",
        image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 385,
        name: "Whisk",
        brand: "Prestige",
        price: 199,
        originalPrice: 299,
        discount: 33,
        material: "Stainless Steel",
        size: "10 inch",
        image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 386,
        name: "Peeler",
        brand: "OXO",
        price: 249,
        originalPrice: 349,
        discount: 29,
        material: "Stainless Steel",
        grip: "Rubber",
        image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 387,
        name: "Kitchen Scissors",
        brand: "Victorinox",
        price: 599,
        originalPrice: 799,
        discount: 25,
        material: "Stainless Steel",
        grip: "Plastic",
        image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 388,
        name: "Grater",
        brand: "Wonderchef",
        price: 349,
        originalPrice: 499,
        discount: 30,
        material: "Stainless Steel",
        type: "4-sided",
        image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      }
    ]
  },
  automobiles: {
    "seat-covers": [
      {
        id: 49,
        name: "Leather Car Seat Cover",
        brand: "Autofurnish",
        price: 2999,
        originalPrice: 4999,
        discount: 40,
        color: "black",
        material: "PU Leather",
        image: "https://images.unsplash.com/photo-1547245324-d777c6f05e80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 50,
        name: "Fabric Car Seat Cover",
        brand: "Jovi",
        price: 1999,
        originalPrice: 2999,
        discount: 33,
        color: "grey",
        material: "Polyester",
        image: "https://images.unsplash.com/photo-1547245324-d777c6f05e80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 389,
        name: "Premium Car Seat Cover",
        brand: "Autofurnish",
        price: 3999,
        originalPrice: 5999,
        discount: 33,
        color: "brown",
        material: "Genuine Leather",
        image: "https://images.unsplash.com/photo-1547245324-d777c6f05e80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 390,
        name: "Waterproof Car Seat Cover",
        brand: "Jovi",
        price: 2499,
        originalPrice: 3499,
        discount: 29,
        color: "black",
        material: "Neoprene",
        image: "https://images.unsplash.com/photo-1547245324-d777c6f05e80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 391,
        name: "SUV Car Seat Cover",
        brand: "Autofurnish",
        price: 3499,
        originalPrice: 4999,
        discount: 30,
        color: "beige",
        material: "PU Leather",
        image: "https://images.unsplash.com/photo-1547245324-d777c6f05e80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 392,
        name: "Hatchback Car Seat Cover",
        brand: "Jovi",
        price: 2299,
        originalPrice: 3299,
        discount: 30,
        color: "grey",
        material: "Polyester",
        image: "https://images.unsplash.com/photo-1547245324-d777c6f05e80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      }
    ],
    "helmets": [
      {
        id: 51,
        name: "Full Face Helmet",
        brand: "Vega",
        price: 1999,
        originalPrice: 2999,
        discount: 33,
        color: "black",
        size: "L",
        image: "https://images.unsplash.com/photo-1619847546747-25c69a4b1e9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 52,
        name: "Open Face Helmet",
        brand: "Steelbird",
        price: 1499,
        originalPrice: 1999,
        discount: 25,
        color: "red",
        size: "M",
        image: "https://images.unsplash.com/photo-1619847546747-25c69a4b1e9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 393,
        name: "Modular Helmet",
        brand: "LS2",
        price: 3999,
        originalPrice: 5999,
        discount: 33,
        color: "black",
        size: "L",
        image: "https://images.unsplash.com/photo-1619847546747-25c69a4b1e9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 394,
        name: "Off-Road Helmet",
        brand: "Vega",
        price: 2499,
        originalPrice: 3499,
        discount: 29,
        color: "green",
        size: "XL",
        image: "https://images.unsplash.com/photo-1619847546747-25c69a4b1e9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 395,
        name: "Half Helmet",
        brand: "Steelbird",
        price: 999,
        originalPrice: 1499,
        discount: 33,
        color: "blue",
        size: "M",
        image: "https://images.unsplash.com/photo-1619847546747-25c69a4b1e9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 396,
        name: "Racing Helmet",
        brand: "LS2",
        price: 4999,
        originalPrice: 6999,
        discount: 29,
        color: "red",
        size: "L",
        image: "https://images.unsplash.com/photo-1619847546747-25c69a4b1e9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      }
    ],
    "car-accessories": [
      {
        id: 397,
        name: "Car Phone Holder",
        brand: "Portronics",
        price: 499,
        originalPrice: 799,
        discount: 38,
        color: "black",
        type: "Magnetic",
        image: "https://images.unsplash.com/photo-1547245324-d777c6f05e80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 398,
        name: "Car Charger",
        brand: "Ambrane",
        price: 399,
        originalPrice: 599,
        discount: 33,
        color: "black",
        ports: "Dual USB",
        image: "https://images.unsplash.com/photo-1547245324-d777c6f05e80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 399,
        name: "Car Air Freshener",
        brand: "Godrej",
        price: 299,
        originalPrice: 399,
        discount: 25,
        fragrance: "Lemon",
        type: "Gel",
        image: "https://images.unsplash.com/photo-1547245324-d777c6f05e80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 400,
        name: "Car Floor Mats",
        brand: "Autofurnish",
        price: 999,
        originalPrice: 1499,
        discount: 33,
        color: "black",
        material: "Rubber",
        image: "https://images.unsplash.com/photo-1547245324-d777c6f05e80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 401,
        name: "Car Dash Camera",
        brand: "70mai",
        price: 2999,
        originalPrice: 4499,
        discount: 33,
        resolution: "1080p",
        features: "Night Vision",
        image: "https://images.unsplash.com/photo-1547245324-d777c6f05e80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 402,
        name: "Car Vacuum Cleaner",
        brand: "Black+Decker",
        price: 1999,
        originalPrice: 2999,
        discount: 33,
        power: "12V",
        type: "Handheld",
        image: "https://images.unsplash.com/photo-1547245324-d777c6f05e80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      }
    ],
    "bike-accessories": [
      {
        id: 403,
        name: "Bike Phone Mount",
        brand: "Bobo",
        price: 399,
        originalPrice: 599,
        discount: 33,
        color: "black",
        material: "Silicone",
        image: "https://images.unsplash.com/photo-1619847546747-25c69a4b1e9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 404,
        name: "Bike Gloves",
        brand: "Probiker",
        price: 699,
        originalPrice: 999,
        discount: 30,
        color: "black",
        size: "L",
        image: "https://images.unsplash.com/photo-1619847546747-25c69a4b1e9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 405,
        name: "Bike Lock",
        brand: "Godrej",
        price: 499,
        originalPrice: 799,
        discount: 38,
        type: "Chain Lock",
        material: "Hardened Steel",
        image: "https://images.unsplash.com/photo-1619847546747-25c69a4b1e9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 406,
        name: "Bike Tail Light",
        brand: "Nivia",
        price: 299,
        originalPrice: 399,
        discount: 25,
        color: "red",
        type: "LED",
        image: "https://images.unsplash.com/photo-1619847546747-25c69a4b1e9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 407,
        name: "Bike Cover",
        brand: "Jovi",
        price: 599,
        originalPrice: 799,
        discount: 25,
        color: "black",
        material: "Polyester",
        image: "https://images.unsplash.com/photo-1619847546747-25c69a4b1e9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 408,
        name: "Bike Jacket",
        brand: "Rynox",
        price: 3999,
        originalPrice: 5999,
        discount: 33,
        color: "black",
        size: "L",
        image: "https://images.unsplash.com/photo-1619847546747-25c69a4b1e9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      }
    ]
  }
};

export default productData;

        
