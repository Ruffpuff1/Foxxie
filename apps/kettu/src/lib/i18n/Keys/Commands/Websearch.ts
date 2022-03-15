import { FT, T } from '#types/Utils';

export const AnimalcrossingCoffee = FT<{ beans: string; milk: string; sugar: string }>('commands/websearch:animalcrossingCoffee');
export const AnimalcrossingDescription = T('commands/websearch:animalcrossingDescription');
export const AnimalcrossingDescriptionVillager = T('commands/websearch:animalcrossingDescriptionVillager');
export const AnimalcrossingFooter = T('commands/websearch:animalcrossingFooter');
export const AnimalcrossingNoVillager = FT<{ villager: string }>('commands/websearch:animalcrossingNoVillager');
export const AnimalcrossingOptionVillager = T('commands/websearch:animalcrossingOptionVillager');
export const AnimalcrossingTitles = T<{
    birthday: string;
    catchphrase: string;
    coffee: string;
    game: string;
    gender: string;
    goal: string;
    personality: string;
    saying: string;
    series: string;
    siblings: string;
    skill: string;
    song: string;
    species: string;
    zodiac: string;
}>('commands/websearch:animalcrossingTitles');
export const CurrencyDescription = T('commands/websearch:currencyDescription');
export const CurrencyMessage = FT<{ amount: string; from: string; value: string; to: string }>('commands/websearch:currencyMessage');
export const CurrencyNotCurrency = FT<{ from: string; to: string }>('commands/websearch:currencyNotCurrency');
export const CurrencyOptionAmount = T('commands/websearch:currencyOptionAmount');
export const CurrencyOptionFrom = T('commands/websearch:currencyOptionFrom');
export const CurrencyOptionTo = T('commands/websearch:currencyOptionTo');
export const GithubDescription = T('commands/websearch:githubDescription');
export const GithubDescriptionRepo = T('commands/websearch:githubDescriptionRepo');
export const GithubDescriptionUser = T('commands/websearch:githubDescriptionUser');
export const GithubIssuePRNotFound = FT<{ number: number }>('commands/websearch:githubIssuePRNotFound');
export const GithubIssuePRNotFoundWithSelectMenuData = FT<{ number: number }>('commands/websearch:githubIssuePRNotFoundWithSelectMenuData');
export const GithubLabelClosed = T('commands/websearch:githubLabelClosed');
export const GithubLabelMerged = T('commands/websearch:githubLabelMerged');
export const GithubLabelOpen = T('commands/websearch:githubLabelOpen');
export const GithubOptionNumber = T('commands/websearch:githubOptionNumber');
export const GithubOptionOwner = T('commands/websearch:githubOptionOwner');
export const GithubOptionRepo = T('commands/websearch:githubOptionRepo');
export const GithubOptionUser = T('commands/websearch:githubOptionUser');
export const GithubRepoNotFound = FT<{ repo: string; user: string }>('commands/websearch:githubRepoNotFound');
export const GithubSelectPages = T<string[]>('commands/websearch:githubSelectPages');
export const GithubTitles = T<{
    archived: string;
    bio: string;
    contributors: string;
    description: string;
    forks: string;
    language: string;
    license: string;
    location: string;
    occupation: string;
    openIssues: string;
    stars: string;
    website: string;
}>('commands/websearch:githubTitles');
export const GithubUserCreated = FT<{ date: string }>('commands/websearch:githubUserCreated');
export const GithubUserNotFound = FT<{ user: string }>('commands/websearch:githubUserNotFound');
export const GithubUserUpdated = FT<{ date: string }>('commands/websearch:githubUserUpdated');
export const NpmDescription = T('commands/websearch:npmDescription');
export const NpmNoDependencies = T('commands/websearch:npmNoDependencies');
export const NpmNoResults = FT<{ package: string }>('commands/websearch:npmNoResults');
export const NpmOptionPackage = T('commands/websearch:npmOptionPackage');
export const NpmTitles = T<{
    author: string;
    dependencies: string;
    main: string;
    maintainers: string;
}>('commands/websearch:npmTitles');
export const PokemonDescription = T('commands/websearch:pokemonDescription');
export const PokemonDescriptionDex = T('commands/websearch:pokemonDescriptionDex');
export const PokemonDescriptionMove = T('commands/websearch:pokemonDescriptionMove');
export const PokemonDexNone = FT<{ pokemon: string }>('commands/websearch:pokemonDexNone');
export const PokemonDexSelect = T('commands/websearch:pokemonDexSelect');
export const PokemonDexSelectPages = T<string[]>('commands/websearch:pokemonDexSelectPages');
export const PokemonDexSmogonUnknown = T('commands/websearch:pokemonDexSmogonUnknown');
export const PokemonMoveNone = FT<{ move: string }>('commands/websearch:pokemonMoveNone');
export const PokemonMoveSelect = T('commands/websearch:pokemonMoveSelect');
export const PokemonMoveSelectPages = T<string[]>('commands/websearch:pokemonMoveSelectPages');
export const PokemonOptionMove = T('commands/websearch:pokemonOptionMove');
export const PokemonOptionPokemon = T('commands/websearch:pokemonOptionPokemon');
export const PokemonOptionSprite = T('commands/websearch:pokemonOptionSprite');
export const PokemonTitles = T<{
    abilities: string;
    baseStats: string;
    baseStatsTotal: string;
    cosmetic: string;
    dex: string;
    eggGroups: string;
    eggObtainable: string;
    ev: string;
    evolutions: string;
    external: string;
    gender: string;
    height: string;
    levelingRate: string;
    maxHatch: string;
    minHatch: string;
    other: string;
    smogon: string;
    types: string;
    weight: string;
}>('commands/websearch:pokemonTitles');
export const StardewvalleyDescription = T('commands/websearch:stardewvalleyDescription');
export const StardewvalleyDescriptionCharacter = T('commands/websearch:stardewvalleyDescriptionCharacter');
export const StardewvalleyNoVillager = FT<{ villager: string }>('commands/websearch:stardewvalleyNoVillager');
export const StardewvalleyOptionVillager = T('commands/websearch:stardewvalleyOptionVillager');
export const StardewvalleyTitles = T<{
    address: string;
    bestGifts: string;
    birthday: string;
    family: string;
    friends: string;
    livesIn: string;
    marryable: string;
}>('commands/websearch:stardewvalleyTitles');
export const StardewvalleyVillagerPageLabels = T<[string, string]>('commands/websearch:stardewvalleyVillagerPageLabel');
