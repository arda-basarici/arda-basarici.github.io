import steamlensShot from '../assets/apps/steamlens.png';

// What the /apps/ page lists: live, usable deployments — portfolio apps and side
// projects. Edit this list to change the page; order here is display order.
// Entries have no pages of their own (cards link out), so this stays a data
// module rather than a content collection until a card needs a prose body.
// Cards carry no code/report links — the page's lede routes readers to Projects
// for the story and the repo behind each app.
export interface AppEntry {
  name: string;
  // One sentence: what you can do with it, not how it was built.
  description: string;
  // The live deployment; opens in a new tab.
  url: string;
  // A wide crop of the app's own UI (src/assets/apps/) — evidence it runs, not decoration.
  image?: ImageMetadata;
  imageAlt?: string;
}

export const apps: AppEntry[] = [
  {
    name: 'SteamLens',
    description: 'Pick a Steam game and read what its reviews actually praise and criticize.',
    url: 'https://steamlens.ardabasarici.dev',
    image: steamlensShot,
    imageAlt: 'The steam-lens landing page: type a game name, get the report.',
  },
];
