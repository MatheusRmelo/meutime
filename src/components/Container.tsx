
interface Props {
    children: React.ReactElement,
}
export default function Container({children} : Props){
    return (
        <main style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            width: '100%',
            height: '100vh'
        }}>
            {children}
        </main>
    );
}