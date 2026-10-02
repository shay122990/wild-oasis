// // import { useNavigate } from "react-router-dom";
// import styled from "styled-components";

// import Spinner from "../../ui/Spinner";
// // import BookingDataBox from "./BookingDataBox";
// import Row from "../../ui/Row";
// import Heading from "../../ui/Heading";
// import Tag from "../../ui/Tag";
// import ButtonGroup from "../../ui/ButtonGroup";
// import Button from "../../ui/Button";
// import Modal from "../../ui/Modal";
// // import ConfirmDelete from "../../ui/ConfirmDelete";

// import { useBooking } from "../../hooks/bookings/useBooking";
// // import { useDeleteBooking } from "../../hooks/bookings/useDeleteBooking";
// import { useMoveBack } from "../../hooks/useMoveBack";
// // import { useCheckout } from "features/check-in-out/useCheckout";
// import ButtonText from "../../ui/ButtonText";
// import Empty from "../../ui/Empty";

// const HeadingGroup = styled.div`
//   display: flex;
//   gap: 2.4rem;
//   align-items: center;
// `;

// function BookingDetail() {
//   const { booking, isPending } = useBooking();
//   // const { mutate: deleteBooking, isLoading: isDeleting } = useDeleteBooking();
//   // const { mutate: checkout, isLoading: isCheckingOut } = useCheckout();

//   const moveBack = useMoveBack();
//   // const navigate = useNavigate();

//   if (isPending) return <Spinner />;
//   if (!booking) return <Empty resource="booking" />;

//   const statusToTagName = {
//     unconfirmed: "blue",
//     "checked-in": "green",
//     "checked-out": "silver",
//   };

//   const { id: bookingId, status } = booking;

//   return (
//     <>
//       <Row type="horizontal">
//         <HeadingGroup>
//           <Heading type="h1">Booking #{bookingId}</Heading>
//           <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
//         </HeadingGroup>
//         <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
//       </Row>

//       {/* <BookingDataBox booking={booking} /> */}

//       <ButtonGroup>
//         {/* {status === "unconfirmed" && (
//           <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
//             Check in
//           </Button>
//         )} */}

//         {/* {status === "checked-in" && (
//           <Button onClick={() => checkout(bookingId)} disabled={isCheckingOut}>
//             Check out
//           </Button>
//         )} */}

//         <Modal>
//           <Modal.Toggle opens="delete">
//             <Button variation="danger">Delete booking</Button>
//           </Modal.Toggle>
//           {/* <Modal.Window name="delete">
//             <ConfirmDelete
//               resource="booking"
//               // These options will be passed wherever the function gets called, and they determine what happens next
//               onConfirm={(options) => deleteBooking(bookingId, options)}
//               disabled={isDeleting}
//             />
//           </Modal.Window> */}
//         </Modal>

//         <Button variation="secondary" onClick={moveBack}>
//           Back
//         </Button>
//       </ButtonGroup>
//     </>
//   );
// }

// export default BookingDetail;

import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";

import { useBooking } from "../../hooks/bookings/useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import ButtonText from "../../ui/ButtonText";
import Empty from "../../ui/Empty";
import BookingDataBox from "./BookingDataBox";
import { useNavigate } from "react-router-dom";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isPending } = useBooking();

  const navigate = useNavigate();

  const moveBack = useMoveBack();

  if (isPending) return <Spinner />;
  if (!booking) return <Empty resource="booking" />;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const { id: bookingId, status } = booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading type="h1">Booking #{bookingId}</Heading>

          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>

        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={booking} />
      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            variation="secondary"
            size="small"
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            Check in
          </Button>
        )}
        <Button variation="secondary" size="small" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
