import HeroBanner from "../components/HeroBanner/HeroBanner";
import MovieRow from "../components/MovieRow/MovieRow";
import PageState from "../components/PageState/PageState";
import useHomeSections from "../hooks/useHomeSections";
import "./Home.css";

function Home() {
  const { sections, isLoading, error } = useHomeSections();

  if (isLoading) {
    return <PageState title="FlexNet" message="Laddar filmer..." />;
  }

  if (error) {
    return <PageState title="Något gick fel" message={error} />;
  }

  return (
    <main className="home-page">
      <HeroBanner />

      <div className="home-page__rows" id="rows">
        {sections.map((section) => (
          <MovieRow
            key={section.title}
            title={section.title}
            movies={section.movies}
            isTop10={section.isTop10}
            badge={section.badge}
          />
        ))}
      </div>
    </main>
  );
}

export default Home;
