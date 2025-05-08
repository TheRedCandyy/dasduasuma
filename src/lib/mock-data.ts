import type { Product } from './types'

export const mockProducts: Product[] = [
    {
        id: '1',
        name: 'Valencia Pinot Noir',
        description:
            'Our signature wine with rich dark berry flavors, subtle oak notes, and a velvety finish. From the Bannockburn soils of Central Otago.',
        price: 170.0,
        image: '/images/products/valencia-pinot.jpg',
        category: 'red',
        inStock: true,
        features: [
            'Vintage 2019',
            'Central Otago, New Zealand',
            'Aged 18 months in French oak',
        ],
    },
    {
        id: '2',
        name: 'Le Vinto Merlot',
        description:
            'A smooth, full-bodied Merlot with notes of plum, black cherry and subtle hints of chocolate. Excellent with red meats and aged cheeses.',
        price: 170.0,
        image: '/images/products/levinto-merlot.jpg',
        category: 'red',
        inStock: true,
        features: [
            'Vintage 2018',
            "Hawke's Bay, New Zealand",
            'Aged 16 months in oak barrels',
        ],
    },
    {
        id: '3',
        name: 'Spina Rosé',
        description:
            'A crisp, vibrant rosé with notes of strawberry, watermelon and a refreshing acidity. Perfect for summer days.',
        price: 200.0,
        image: '/images/products/spina-rose.jpg',
        category: 'rosé',
        inStock: true,
        features: [
            'Vintage 2020',
            'Marlborough, New Zealand',
            'Limited edition',
        ],
    },
    {
        id: '4',
        name: 'Calvert Reserve Chardonnay',
        description:
            'A complex and elegant Chardonnay with notes of citrus, stone fruit, and delicate oak influence. Beautifully balanced.',
        price: 150.0,
        image: '/images/products/calvert-chardonnay.jpg',
        category: 'white',
        inStock: false,
        features: [
            'Vintage 2019',
            'Bannockburn, Central Otago',
            'Barrel fermented',
        ],
    },
    {
        id: '5',
        name: 'Felton Road Sauvignon Blanc',
        description:
            'Vibrant and aromatic with notes of passionfruit, gooseberry, and fresh herbs. A quintessential New Zealand Sauvignon Blanc.',
        price: 130.0,
        image: '/images/products/felton-sauvignon.jpg',
        category: 'white',
        inStock: true,
        features: [
            'Vintage 2021',
            'Marlborough, New Zealand',
            'Sustainably grown',
        ],
    },
    {
        id: '6',
        name: 'Otago Valley Sparkling Brut',
        description:
            'A sophisticated sparkling wine with fine bubbles, crisp apple notes, and a hint of brioche. Perfect for celebrations.',
        price: 190.0,
        image: '/images/products/otago-brut.jpg',
        category: 'sparkling',
        inStock: true,
        features: [
            'Traditional method',
            'Aged 24 months on lees',
            '12.5% alcohol',
        ],
    },
    {
        id: '7',
        name: 'Valencia Reserve Collection',
        description:
            'Our exclusive Reserve Collection gift set featuring three of our most acclaimed wines in an elegant wooden gift box.',
        price: 450.0,
        image: '/images/products/reserve-collection.jpg',
        category: 'collection',
        inStock: true,
        features: [
            'Valencia Pinot Noir',
            'Calvert Reserve Chardonnay',
            'Otago Valley Sparkling Brut',
        ],
    },
    {
        id: '8',
        name: 'Bannockburn Late Harvest Riesling',
        description:
            'A luscious dessert wine with honeyed notes of apricot, peach, and floral undertones. Perfectly balanced sweetness and acidity.',
        price: 140.0,
        image: '/images/products/late-harvest.jpg',
        category: 'dessert',
        inStock: true,
        features: [
            'Vintage 2020',
            'Central Otago, New Zealand',
            'Handpicked late harvest grapes',
        ],
    },
]
