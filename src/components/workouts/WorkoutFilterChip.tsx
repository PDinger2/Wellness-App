import { Text, Chip } from "react-native-paper"


export function WorkoutFilterChip({ tag, isSelected, onSelect }){
    return (
        <Chip 
            compact
            selected={isSelected}
            onPress={() => onSelect(isSelected ? "all" : tag)}
            >{tag}
        </Chip>
    )
}