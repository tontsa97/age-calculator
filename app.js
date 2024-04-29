// Hae input-elementti nimeltä "date"
let userInput = document.querySelector("#date");
// Aseta input-elementin maksimiarvoksi nykyinen päivämäärä suomalaisessa päivämäärämuodossa
userInput.max = new Date().toLocaleDateString('fi-FI');

// Hae elementti nimeltä "result"
let result = document.querySelector("#result");

// Funktio laskemaan ikä annetun syntymäpäivän ja nykyisen päivämäärän perusteella
function calculateAge(syntymäpäivä, nykyinenPäivä) {
    // Erottele päivä, kuukausi ja vuosi syntymäpäivästä
    let d1 = syntymäpäivä.getDate();
    let m1 = syntymäpäivä.getMonth() + 1;
    let v1 = syntymäpäivä.getFullYear();
    
    // Erottele päivä, kuukausi ja vuosi nykyisestä päivämäärästä
    let d2 = nykyinenPäivä.getDate();
    let m2 = nykyinenPäivä.getMonth() + 1;
    let v2 = nykyinenPäivä.getFullYear();
    
    let päivät, kuukaudet, vuodet;

    // Lasketaan vuosien ero syntymäpäivän ja nykyisen päivämäärän välillä
    vuodet = v2 - v1;

    // Tarkistetaan, onko nykyisen päivämäärän kuukausi pienempi kuin syntymäpäivän kuukausi,
    // tai ovatko kuukaudet samat mutta päivä nykyisessä päivämäärässä on pienempi kuin syntymäpäivän päivä
    if (m2 < m1 || (m2 === m1 && d2 < d1)) {
        // Vähennetään vuosi, koska syntymäpäivä ei ole vielä tänä vuonna tapahtunut
        vuodet--;
        // Lisätään nykyisen päivämäärän kuukausiin 12, jotta voidaan laskea kuukausien erotus
        m2 += 12;
    }

    // Lasketaan kuukausien ja päivien erot syntymäpäivän ja nykyisen päivämäärän välillä
    kuukaudet = m2 - m1;
    päivät = d2 - d1;

    // Jos päivien määrä on negatiivinen, vähennetään kuukausi ja lisätään päivämäärän maksimimäärä kyseisessä kuukaudessa
    if (päivät < 0) {
        kuukaudet--;
        päivät += getDaysInMonth(v1, m1);
    }

    // Palautetaan ikä objektina, joka sisältää vuodet, kuukaudet ja päivät
    return { vuodet: vuodet, kuukaudet: kuukaudet, päivät: päivät };
}

// Funktio, joka päivittää näytettävän tuloksen käyttäen laskettua ikää
function calculateAgeAndUpdate() {
    // Luetaan käyttäjän antama syntymäpäivä ja luodaan siitä uusi Date-objekti
    let syntymäpäivä = new Date(userInput.value);
    // Luodaan nykyisen päivämäärän Date-objekti
    let nykyinenPäivä = new Date();
    // Lasketaan ikä
    let ikä = calculateAge(syntymäpäivä, nykyinenPäivä);

    // Päivitetään tulos HTML-elementtiin näyttämään laskettu ikä
    result.textContent = `Olet ${ikä.vuodet} vuotta, ${ikä.kuukaudet} kuukautta ja ${ikä.päivät} päivää vanha.`;
}

// Lisätään tapahtumankuuntelija input-elementille, joka kutsuu calculateAgeAndUpdate-funktiota
// aina kun inputin arvo muuttuu (esim. kun käyttäjä valitsee uuden päivämäärän)
userInput.addEventListener('change', calculateAgeAndUpdate);
