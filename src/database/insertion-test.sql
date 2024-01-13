-- Insert Users
INSERT INTO Users(idUser, mail,accountVerified,username,password,isAdmin) VALUES (1,'admin@univ-ubs.fr',1,'admin','$2a$10$QnGST8hQwYefFAELGrgMWuxD6IhETxAjUAp9AOi62s4jstZoTIz5e',1);
INSERT INTO Users(idUser, mail,accountVerified,username,password,isAdmin) VALUES (2,'test1@univ-ubs.fr',1,'test1','$2a$10$QnGST8hQwYefFAELGrgMWuxD6IhETxAjUAp9AOi62s4jstZoTIz5e',1);
INSERT INTO Users(idUser, mail,accountVerified,username,password,isAdmin) VALUES (3,'test2@univ-ubs.fr',1,'test2','$2a$10$QnGST8hQwYefFAELGrgMWuxD6IhETxAjUAp9AOi62s4jstZoTIz5e',1);
INSERT INTO Users(idUser, mail,accountVerified,username,password,isAdmin) VALUES (4,'test3@univ-ubs.fr',1,'test3','$2a$10$QnGST8hQwYefFAELGrgMWuxD6IhETxAjUAp9AOi62s4jstZoTIz5e',1);
INSERT INTO Users(idUser, mail,accountVerified,username,password,isAdmin) VALUES (5,'test4@univ-ubs.fr',1,'test4','$2a$10$QnGST8hQwYefFAELGrgMWuxD6IhETxAjUAp9AOi62s4jstZoTIz5e',0);
INSERT INTO Users(idUser, mail,accountVerified,username,password,isAdmin) VALUES (6,'test5@univ-ubs.fr',1,'test5','$2a$10$QnGST8hQwYefFAELGrgMWuxD6IhETxAjUAp9AOi62s4jstZoTIz5e',0);
INSERT INTO Users(idUser, mail,accountVerified,username,password,isAdmin) VALUES (7,'test6@univ-ubs.fr',0,'test6','$2a$10$QnGST8hQwYefFAELGrgMWuxD6IhETxAjUAp9AOi62s4jstZoTIz5e',0);
INSERT INTO Users(idUser, mail,accountVerified,username,password,isAdmin) VALUES (8,'test7@univ-ubs.fr',0,'test7','$2a$10$QnGST8hQwYefFAELGrgMWuxD6IhETxAjUAp9AOi62s4jstZoTIz5e',0);
INSERT INTO Users(idUser, mail,accountVerified,username,password,isAdmin) VALUES (9,'test8@univ-ubs.fr',0,'test8','$2a$10$QnGST8hQwYefFAELGrgMWuxD6IhETxAjUAp9AOi62s4jstZoTIz5e',0);
INSERT INTO Users(idUser, mail,accountVerified,username,password,isAdmin) VALUES (10,'test9@univ-ubs.fr',0,'test9','$2a$10$QnGST8hQwYefFAELGrgMWuxD6IhETxAjUAp9AOi62s4jstZoTIz5e',0);

-- Insert Owns
INSERT INTO Owns (aUser, aBadge, obtentionDate) VALUES (2, 2, '2023/12/11');
INSERT INTO Owns (aUser, aBadge, obtentionDate) VALUES (2, 3, '2023/12/11');
INSERT INTO Owns (aUser, aBadge, obtentionDate) VALUES (1, 3, '2023/12/11');
INSERT INTO Owns (aUser, aBadge, obtentionDate) VALUES (1, 4, '2023/12/11');
INSERT INTO Owns (aUser, aBadge, obtentionDate) VALUES (1, 5, '2023/12/11');
INSERT INTO Owns (aUser, aBadge, obtentionDate) VALUES (1, 6, '2023/12/11');


-- Insert HasTried
INSERT INTO HasTried (aUser, aChallenge, flagged, hour, retryNb) VALUES (1,1,'2024/01/08','18:01',1);
INSERT INTO HasTried (aUser, aChallenge, flagged, hour, retryNb) VALUES (1,2,'2023/11/18','10:01',1);
INSERT INTO HasTried (aUser, aChallenge, flagged, hour, retryNb) VALUES (1,3,'2023/12/30','18:01',1);
INSERT INTO HasTried (aUser, aChallenge, flagged, hour, retryNb) VALUES (1,4,'2024/01/14','18:01',5);
INSERT INTO HasTried (aUser, aChallenge, flagged, hour, retryNb) VALUES (1,8,'2024/01/30','11:01',10);
INSERT INTO HasTried (aUser, aChallenge, flagged, hour, retryNb) VALUES (1,6,'2024/01/01','14:01',7);
INSERT INTO HasTried (aUser, aChallenge, flagged, hour, retryNb) VALUES (2,1,'2024/01/20','10:01',1);
INSERT INTO HasTried (aUser, aChallenge, flagged, hour, retryNb) VALUES (1,7,NULL,null,4);