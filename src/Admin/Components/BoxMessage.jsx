// USAGE:    <BoxMessage variant='danger' className='text-black' >Seems, There is No Data...</BoxMessage>


// import Alert from 'react-bootstrap/Alert'

export default function BoxMessage(props) {
    console.log('**********************************************props Childern are:', props.children)

  return (
    // <Alert  variant={props.variant || 'info'}> {props.children}        </Alert>
<>
Alert message here {props.children}
</>







    // <Alert variant={props.variant || 'info'}  dismissible>

    // <Alert.Heading>Oh snap! You got an error! with {props.children}</Alert.Heading>
    //     <p>
    //       Change this and that and try again. Duis mollis, est non commodo
    //       luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
    //       Cras mattis consectetur purus sit amet fermentum.
    //     </p>
    //   </Alert>

)
}

