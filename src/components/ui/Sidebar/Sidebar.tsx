import { SidebarLink } from "./SidebarLink";

export const Sidebar = () => {
  return (
    <aside className="bg-sidebar h-full">
      <ul>
        <SidebarLink to="/top-animes" label="Top animes"/>
        <SidebarLink to="/animes-atualizados" label="Animes atualizados" />
        <SidebarLink to="/lista-de-animes-dublados" label="Animes dublados" />
        <SidebarLink to="/lista-de-animes-legendados" label="Animes legendados" />
        <SidebarLink to="/lista-de-filmes-legendados" label="Filmes legendados" />
        <SidebarLink to="/lista-de-filmes-dublados" label="Filmes dublados" />
      </ul>
    </aside>
  );
};
