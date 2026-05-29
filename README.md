# FlexNet 

FlexNet är en Netflix-inspirerad webbapplikation byggd med React och TMDB API. Applikationen gör det möjligt för användare att utforska populära filmer och serier, läsa detaljerad information och spara titlar i en personlig watchlist.

## Funktioner

* Visa populära filmer och serier från TMDB API
* Dynamiska filmdetaljsidor
* Netflix-inspirerad UI med hover-effekter och modal preview
* Sökfunktion för filmer
* Watchlist med CRUD-funktionalitet
* Data sparas i localStorage
* Responsiv design för desktop och mobil
* Loading- och error-hantering

## Tech Stack

* React
* React Router
* JavaScript
* CSS
* TMDB API
* Vite

## Projektstruktur

src/
 ├── components/
 ├── context/
 ├── hooks/
 ├── pages/
 ├── reducers/
 ├── services/
 ├── styles/
 ├── utils/

## Gruppmedlemmar och ansvar

### Dennis — Layout, navigation och routing

* Implementerade React Router och routes
* Byggde Navbar och Footer
* Skapade Layout-komponenten
* Byggde startsidan och grundstrukturen för projektet

### Faisal — Sökning och filtrering

* Implementerade sökfunktionalitet
* Byggde söksidan
* Hanterade formulär, loading och error states
* Implementerade filtrering och sortering

### Nikos — Filmdetaljer och dynamiska routes

* Byggde dynamiska routes för filmdetaljer
* Hämtade detaljerad data från TMDB API
* Implementerade conditional rendering
* Byggde detaljsidan för filmer och serier

### Shemaa — Watchlist och state management

* Implementerade watchlist-funktionalitet
* Byggde CRUD-operationer (Create, Read, Update, Delete)
* Implementerade localStorage persistence
* Skapade Context API och useReducer för global state
* Byggde custom hooks
* Implementerade Title Preview Modal och förbättrad UI/UX

## React-koncept som används

* Components
* Props
* useState
* useEffect
* useReducer
* Context API
* Custom Hooks
* React Router
* Dynamic Routes
* Conditional Rendering
* Forms och validering
* useRef
* CRUD-operationer
* LocalStorage persistence

## Framtida förbättringar

* En riktig login sida
* Backend-integration
* Favoritsystem
* Trailer-visning
* Fler filter och kategorier
* Dark/light mode

## Authors

* Dennis
* Faisal
* Nikos
* Shemaa