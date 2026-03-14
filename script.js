document.getElementById("generate").addEventListener("click", async () => {
    const days = document.getElementById("days").value;
    const itineraryDiv = document.getElementById("itinerary");

    // Aquí llamaremos a tu API (temporalmente simulamos)
    // Más adelante reemplazas la URL por tu Azure Function o Render API
    const apiUrl = `https://tudominio-o-funcion.azurewebsites.net/api/itinerary?city=madrid&days=${days}`;

    // Por ahora simulamos itinerario
    const mockItinerary = {
        "1": ["Puerta del Sol", "Plaza Mayor", "Mercado de San Miguel"],
        "2": ["Museo del Prado", "Parque del Retiro", "Gran Vía"]
    };

    itineraryDiv.innerHTML = ""; // limpiar
    for (let i = 1; i <= days; i++) {
        const day = document.createElement("h3");
        day.textContent = `Día ${i}`;
        itineraryDiv.appendChild(day);

        const ul = document.createElement("ul");
        (mockItinerary[i] || []).forEach(place => {
            const li = document.createElement("li");
            li.textContent = place;
            ul.appendChild(li);
        });
        itineraryDiv.appendChild(ul);
    }

    // Inicializar mapa (Leaflet)
    const map = L.map('map').setView([40.4168, -3.7038], 13); // Madrid
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Añadir marcadores simulados
    const locations = [
        [40.4168, -3.7038, "Puerta del Sol"],
        [40.4155, -3.7074, "Plaza Mayor"],
        [40.4150, -3.7083, "Mercado de San Miguel"]
    ];

    locations.forEach(loc => {
        L.marker([loc[0], loc[1]]).addTo(map)
            .bindPopup(loc[2]);
    });
});
