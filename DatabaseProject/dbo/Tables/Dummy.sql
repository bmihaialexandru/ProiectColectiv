CREATE TABLE [dbo].[Dummy] (
    [Id]   INT        IDENTITY (1, 1) NOT NULL,
    [Name] NCHAR (10) NOT NULL,
    CONSTRAINT [PK_Dummy] PRIMARY KEY CLUSTERED ([Id] ASC)
);

