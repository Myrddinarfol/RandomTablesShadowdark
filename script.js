// Mise à jour des sous-familles en fonction de la famille sélectionnée
const familySelect = document.getElementById('family-select');
const subfamilySelect = document.getElementById('subfamily-select');

// Fonction pour capitaliser la première lettre d'un texte
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Récupération des sous-familles à partir de Firestore
familySelect.addEventListener('change', function() {
    const selectedFamily = familySelect.value;

    // Efface les options actuelles
    subfamilySelect.innerHTML = '';

    // Vérifie si la famille existe dans Firestore
    db.collection('Tables_aléatoires').doc(selectedFamily).get().then((doc) => {
        if (doc.exists) {
            const data = doc.data();
            const subfamilies = Object.keys(data);

            // Ajoute les sous-familles au menu déroulant
            subfamilies.forEach(subfamily => {
                const option = document.createElement('option');
                option.value = subfamily;
                option.textContent = capitalizeFirstLetter(subfamily);
                subfamilySelect.appendChild(option);
            });

            // Débloque la sélection des sous-familles
            subfamilySelect.disabled = false;
        } else {
            subfamilySelect.disabled = true;
        }
    }).catch((error) => {
        console.error("Erreur lors de la récupération des sous-familles :", error);
    });
});

// Génération d'un événement aléatoire en fonction de la famille et de la sous-famille
document.getElementById('generate-btn').addEventListener('click', function () {
    const selectedFamily = familySelect.value;
    const selectedSubfamily = subfamilySelect.value;

    // Récupère la table d'événements depuis Firestore
    db.collection('Tables_aléatoires').doc(selectedFamily).get().then((doc) => {
        if (doc.exists) {
            const data = doc.data();
            const selectedTable = data[selectedSubfamily];

            if (selectedTable) {
                // Choisit un événement aléatoire dans la table
                const randomIndex = Math.floor(Math.random() * selectedTable.length);
                const randomEvent = selectedTable[randomIndex];

                // Affiche le résultat en gras tout en gardant la police
                document.getElementById('result').innerHTML = `<p style="font-weight: bold;">${randomEvent}</p>`;
            } else {
                document.getElementById('result').innerHTML = `<p>Aucune table sélectionnée.</p>`;
            }
        }
    }).catch((error) => {
        console.error("Erreur lors de la récupération de l'événement :", error);
    });
});

// Initialiser l'état des sous-familles à désactivé jusqu'à la sélection d'une famille principale
subfamilySelect.disabled = true;
