DROP TABLE IF EXISTS girl_names, boy_names, unisex_names;

CREATE TABLE girl_names (
      name_id                   SERIAL              PRIMARY KEY
    , name                      VARCHAR(25)         NOT NULL
    , meaning                   TEXT   
    , origin                    TEXT                                                                 
);

CREATE TABLE boy_names (
      name_id                   SERIAL              PRIMARY KEY
    , name                      VARCHAR(25)         NOT NULL
    , meaning                   TEXT   
    , origin                    TEXT                                                                 
);

CREATE TABLE unisex_names (
      unisex_id                 SERIAL              PRIMARY KEY
    , girl_name_id              INTEGER             REFERENCES girl_names(name_id)
    , boy_name_id               INTEGER             REFERENCES boy_names(name_id)
    , name                      VARCHAR(25)         NOT NULL             
);