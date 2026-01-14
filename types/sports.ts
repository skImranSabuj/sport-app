export type Tournament = {
  id: number;
  name: string;
};

export type Sport = {
  id: number;
  sportName: string;
  tournaments: Tournament[];
};
