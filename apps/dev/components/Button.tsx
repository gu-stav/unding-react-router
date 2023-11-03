export function Button({ renderDefault, ...props }) {
    return renderDefault({
        ...props,
        type: 'submit'
    });
}
