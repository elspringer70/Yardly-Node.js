CREATE TABLE listings (
    id SERIAL PRIMARY KEY,
    location VARCHAR(255),
    rating DECIMAL(3,2),
    title VARCHAR(255),
    host_name VARCHAR(100),
    price_per_hour INTEGER,
    image_url TEXT
);

INSERT INTO listings (location, rating, title, host_name, price_per_hour, image_url) VALUES
('Pacific Heights, San Francisco', 4.92, 'Spacious Fenced Backyard', 'Sarah', 15, 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&h=400&fit=crop'),
('Berkeley Hills, Berkeley', 4.88, 'Private Backyard with Tree Cover', 'Michael', 12, 'https://images.unsplash.com/photo-1566809539389-3c3973176d49?w=500&h=400&fit=crop'),
('North Oakland, Oakland', 4.95, 'Fully Fenced Dog Park', 'Emily', 20, 'https://images.unsplash.com/photo-1519052537078-e6302a4968ef?w=500&h=400&fit=crop'),
('West Berkeley, Berkeley', 4.85, 'Large Backyard with Shed', 'David', 18, 'https://images.unsplash.com/photo-1566809539389-3c3973176d49?w=500&h=400&fit=crop');