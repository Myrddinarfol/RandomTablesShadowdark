// Tables de données
const tables = {
    evenements: {
        foret: [
            "Un arbre massif tombe brusquement, bloquant le chemin.",
            "Une meute de loups affamés se rapproche silencieusement.",
            "Vous entendez un grognement féroce dans les fourrés non loin.",
            "Vous sentez une odeur de bois brûlé et l'atmosphère devient de plus en plus chargée de fumée."
        ],
        plaines: [
            "Un orage se lève soudainement, frappant la plaine de ses éclairs.",
            "Une immense horde de bisons traverse à l'horizon."
        ],
        donjon: [
            "Des pièges mécaniques se déclenchent sous vos pas.",
            "Une ancienne crypte s’ouvre, libérant des spectres."
        ],
        urbain: [
            "Une fête locale prend une tournure violente.",
            "Une épidémie se répand rapidement, forçant les autorités à fermer les portes."
        ],
        desert: [
            "Une tempête de sable approche, menaçant d’engloutir tout sur son passage.",
            "Un chameau disparaît mystérieusement dans la nuit."
        ],
        grotte: [
            "Un effondrement bloque l’entrée, piégeant le groupe à l'intérieur.",
            "Des chauves-souris géantes s'envolent brusquement, perturbées par votre présence."
        ]
    },
    rencontres: {
        foret: [
            "Un groupe de gobelins errants surveille les environs.",
            "Un druide solitaire médite sous un grand chêne."
        ],
        desert: [
            "Un marchand nomade approche avec sa caravane.",
            "Un groupe de bandits du désert embusqués sur une colline."
        ],
        grotte: [
            "Des créatures invisibles guettent depuis les ombres.",
            "Une tribu de nains creuse de nouveaux tunnels."
        ],
        plaines: [
            "Une troupe de cavaliers approche au galop.",
            "Un géant des collines erre à l'horizon."
        ]
    },
    tresors: {
        donjon: [
            "Un coffre piégé contenant des gemmes rares.",
            "Une épée légendaire protégée par une malédiction."
        ],
        grotte: [
            "Un collier magique caché sous des pierres.",
            "Une potion de guérison oubliée par un ancien aventurier."
        ]
    },
    meteos: {
        foret: [
            "Une pluie fine tombe, rendant le sol glissant.",
            "Un épais brouillard couvre la forêt, réduisant la visibilité."
        ],
        desert: [
            "Une vague de chaleur frappe soudainement, rendant la progression difficile.",
            "Une tempête de sable obscurcit tout le paysage."
        ]
    }
};

// Mise à jour des sous-familles en fonction de la famille sélectionnée
const familySelect = document.getElementById('family-select');
const subfamilySelect = document.getElementById('subfamily-select');

familySelect.addEventListener('change', function() {
    const selectedFamily = familySelect.value;

    // Efface les options actuelles
    subfamilySelect.innerHTML = '';

    // Ajoute les nouvelles options en fonction de la famille choisie
    if (tables[selectedFamily]) {
        const subfamilies = Object.keys(tables[selectedFamily]);
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
});

// Fonction pour capitaliser la première lettre d'un texte
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Génération d'un événement aléatoire en fonction de la famille et de la sous-famille
document.getElementById('generate-btn').addEventListener('click', function () {
    const selectedFamily = familySelect.value;
    const selectedSubfamily = subfamilySelect.value;

    // Sélectionne la table correspondante
    const selectedTable = tables[selectedFamily][selectedSubfamily];

    if (selectedTable) {
        // Choisit un événement aléatoire dans la table
        const randomIndex = Math.floor(Math.random() * selectedTable.length);
        const randomEvent = selectedTable[randomIndex];

        // Affiche le résultat en gras tout en gardant la police
        document.getElementById('result').innerHTML = `<p style="font-weight: bold;">${randomEvent}</p>`;
    } else {
        document.getElementById('result').innerHTML = `<p>Aucune table sélectionnée.</p>`;
    }
});

// Initialiser l'état des sous-familles à désactivé jusqu'à la sélection d'une famille principale
subfamilySelect.disabled = true;
