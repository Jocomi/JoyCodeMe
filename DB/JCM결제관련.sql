INSERT INTO PAYMENT (PAY_ID, MEMBER_ID, PAY_METHOD, PAY_PRODUCT, PAY_PRICE, PAY_TIME, PAY_STATUS) VALUES
(PAY_CODE.NEXTVAL, 'Download', 'CARD', 'VIP3', 199900, TO_DATE('2024-09-19', 'YYYY-MM-DD'), 'Y');

INSERT INTO PAYMENT (PAY_ID, MEMBER_ID, PAY_METHOD, PAY_PRODUCT, PAY_PRICE, PAY_TIME, PAY_STATUS) VALUES
(PAY_CODE.NEXTVAL, 'Zeus', 'CARD', 'VIP3', 199900, TO_DATE('2024-10-19', 'YYYY-MM-DD'), 'Y');

INSERT INTO PAYMENT (PAY_ID, MEMBER_ID, PAY_METHOD, PAY_PRODUCT, PAY_PRICE, PAY_TIME, PAY_STATUS) VALUES
(PAY_CODE.NEXTVAL, '2weeks', 'CARD', 'VIP3', 199900, TO_DATE('2024-10-19', 'YYYY-MM-DD'), 'Y');

INSERT INTO PAYMENT (PAY_ID, MEMBER_ID, PAY_METHOD, PAY_PRODUCT, PAY_PRICE, PAY_TIME, PAY_STATUS) VALUES
(PAY_CODE.NEXTVAL, 'Rocomi', 'CARD', 'VIP3', 199000, TO_DATE('2024-11-19', 'YYYY-MM-DD'), 'Y');

INSERT INTO PAYMENT (PAY_ID, MEMBER_ID, PAY_METHOD, PAY_PRODUCT, PAY_PRICE, PAY_TIME, PAY_STATUS) VALUES
(PAY_CODE.NEXTVAL, 'test1', 'CARD', 'VIP1', 49900, TO_DATE('2024-11-19', 'YYYY-MM-DD'), 'N');

INSERT INTO PAYMENT (PAY_ID, MEMBER_ID, PAY_METHOD, PAY_PRODUCT, PAY_PRICE, PAY_TIME, PAY_STATUS) VALUES
(PAY_CODE.NEXTVAL, 'test1', 'CARD', 'VIP3', 199000, TO_DATE('2024-11-19', 'YYYY-MM-DD'), 'Y');

commit;
