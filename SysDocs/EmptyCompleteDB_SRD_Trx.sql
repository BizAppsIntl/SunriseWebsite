USE [SRD]
GO

UPDATE [dbo].[AccRec]    SET       [CrntBal] = 0
UPDATE [dbo].[Traders]   SET       [CrntBal] = 0 
UPDATE [dbo].[Items]   SET       [CrntBal] = 0 

--UPDATE [dbo].[Doctors]   SET       [CrntBal] = 0 
--UPDATE [dbo].[Patients]   SET       [CrntBal] = 0
--UPDATE [dbo].[Procedures]   SET       [CrntBal] = 0

--DELETE FROM [dbo].[AccRec]
DELETE FROM [dbo].[AccRecSal]

--DELETE FROM [dbo].[CatItems]
--DELETE FROM [dbo].[Cats]

DELETE FROM [dbo].[Doctors]

--DELETE FROM [dbo].[Items]
DELETE FROM [dbo].[Patients]

--DELETE FROM [dbo].[Procedures]

DELETE FROM [dbo].[Staff]
DELETE FROM [dbo].[StaffLeaves]

DELETE FROM [dbo].[StaffSalDefaults]

--DELETE FROM [dbo].[Suppliers]
--DELETE FROM [dbo].[Traders]


DELETE FROM [dbo].[TranM]
DELETE FROM [dbo].[TranD]
DELETE FROM [dbo].[TranR]

DELETE FROM [dbo].[TranRSal]

--DELETE FROM [dbo].[UserRoles]
--DELETE FROM [dbo].[Users]



--DELETE FROM [dbo].[Staff]

GO
