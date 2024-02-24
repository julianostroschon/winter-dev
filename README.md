


## To create a new migration
```shell
yarn prisma migrate dev
```

## To run Prisma Studio
```shell
yarn prisma studio
```

## To get signedURL
```shell
http post :3333/<declared-route-to-post> name=<file-name.extension> contentType="<content-type>"
```

## To upload file:
```shell
http --form PUT <signedURL> file@<file-name.extension> "Content-Type":"<content-type>"
```