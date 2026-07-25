export default interface GameProps {
    id: string;
    title: string;
    description: string;
    image: string;
    primaryColor: string|number|null;
    secondaryColor: string|number|null;
    priority: number;
}