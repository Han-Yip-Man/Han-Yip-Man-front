import styled from '@emotion/styled';

export const WrapperDiv = styled.div`
  height: 1500px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 1150px;
  width: 100%;
  margin: 0 auto;
  padding-left: 16px;
  box-sizing: border-box;
  gap: 20px;
`;

export const FixedDiv = styled.div`
  position: fixed;
  box-sizing: border-box;
  width: 45%;
  height: 120%;
  margin-left: 0px;
`;

export const Img = styled.img`
  width: 550px;
  height: 550px;
  padding: 50px 0;
`;

export const OptionDiv = styled.div`
  margin-left: 600px;
`;

export const MenuInfoDiv = styled.div`
  width: 80%;
  height: auto;
  margin-top: 50px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 2px solid black;
`;

export const MenuNameDiv = styled.div`
  font-size: 30px;
  font-weight: bold;
  padding-top: 10px;
  margin-bottom: 20px;
`;

export const MenuExpDiv = styled.div`
  font-size: 15px;
  margin-bottom: 30px;
`;

export const SuperPayBox = styled.div`
  background-color: rgb(194, 188, 191, 0.25);
  width: 80%;
  height: auto;
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

export const AgreeBox = styled.div`
  box-sizing: border-box;
  background-color: rgb(194, 188, 191, 0.25);
  width: 80%;
  height: 10%;
  margin-bottom: 20px;
`;

export const OrderInfo = styled.div`
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  margin: 0 25px;
  padding: 25px 0;
`;

export const OrderDetailDiv = styled.div`
  max-width: 550px;
  width: 95%;
  margin: 3px auto;
  display: flex;
  box-sizing: border-box;
  border: 1px solid gray;
  /* border-bottom: none; */
`;

export const OrderTextDiv = styled.div`
  padding: 15px 10px;
`;

export const ProductNameDiv = styled.div`
  padding: 6px 0;
`;

export const ProductCountDiv = styled.div`
  padding: 6px 0;
  color: gray;
`;

export const ProductPriceDiv = styled.div`
  padding: 6px 0;
  font-weight: bold;
`;

export const OrderPrice = styled.div`
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  margin: 0 25px;
  padding: 25px 0;
`;

export const SuperPay = styled.div`
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  margin: 0 15px 0 25px;
  padding: 25px 0 0;
`;

export const OrderPriceContentDiv = styled.div`
  display: flex;
`;

export const OrderPriceTextDiv = styled.div`
  margin-left: 25px;
  margin-right: 65px;
  text-align: left;
`;

export const Text1 = styled.p`
  padding: 10px 0;
  color: gray;
  width: 100px;
`;

export const Text2 = styled.p`
  padding: 10px 0;
  color: gray;
`;

export const OrderPriceNumberDiv = styled.div`
  margin-right: 25px;
  text-align: right;
`;

export const OrderPrice1 = styled.p`
  padding: 10px 0;
  color: #252743;
  font-weight: bold;
`;

export const OrderPrice2 = styled.p`
  padding: 10px 0;
  color: #252743;
  font-weight: bold;
`;

export const OrderPriceHr = styled.hr`
  width: 85%;
  margin: 20px auto;
  color: gray;
`;

export const SuperPayTextDiv = styled.div`
  margin-left: 30px;
  margin-right: 60px;
  text-align: left;
`;

export const SuperPayNumberDiv = styled.div`
  margin-right: 20px;
  text-align: right;
`;

export const Price1 = styled.div`
  padding: 10px 0;
  color: #252743;
  font-weight: bold;
`;
export const Price2 = styled.div`
  padding: 10px 0;
  color: #252743;
  font-weight: bold;
`;

export const SuperPayTotalTextDiv = styled.div`
  margin-left: 30px;
  margin-right: 90px;
  text-align: left;
`;

export const AllAgree = styled.div`
  width: 300px;
  height: 50px;
  display: flex;
  text-align: center;
`;

export const AllAgreeInput = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  margin: 25px 5px 10px 20px;
`;

export const AllAgreeDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 10px;
  height: 50px;
  font-size: 15px;
`;

export const SubAgree = styled.div`
  width: 400px;
  height: 50px;
  display: flex;
  text-align: center;
`;

export const SubIndicateDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
`;

export const BoxLineDiv = styled.div`
  margin: 10px 0px 0px 20px;
  width: 12px;
  height: 12px;
  border: 1px solid gray;
  border-top: none;
  border-right: none;
`;

export const SubAgreeInput = styled.input`
  width: 20px;
  height: 20px;
  margin: 30px 5px 10px 25px;
`;

export const SubAgreeDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 14px 5px;
  height: 50px;
  font-size: 15px;
  width: 240px;
  text-align: left;
  box-sizing: border-box;
`;

export const PaySubmitBox = styled.div`
  background-color: #ffe5e5;
  height: 10%;
`;

export const EditButton = styled.button`
  position: relative;
  border: 1px solid black;
  left: 460px;
  bottom: 125px;
  width: 60px;
  height: 40px;
  opacity: 1;
  text-align: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  transition: 0.3s;
  &:hover {
    background-color: #ffb002;
    color: white;
    border: none;
  }
`;

export const SuperPayTitleDiv = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const ChargeButton = styled.button`
  margin: 18px 0 0 0px;
  width: 70px;
  height: 30px;
  font-size: 13px;
  border: none;
  border-radius: 3px;
  background-color: gray;
  color: white;
  cursor: pointer;
`;
