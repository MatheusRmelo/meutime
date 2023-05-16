

export default function Loading(){
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            width: '100%',
            height: '100%'
        }}>
            <i className="fa fa-spinner fa-spin"></i>
        </div>
    );
}