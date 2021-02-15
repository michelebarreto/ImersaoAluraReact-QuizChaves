/* eslint-disable */
import React, { Children } from 'react';
import NextLink from 'next/link'

//aqui é para não dar auqle refresh lento de uma pagina para outra
export default function Link ({Children, href,...props}){
return(
    <NextLink href={href} passHref>
    <a {...props}>
    {Children}
    
    </a>
    </NextLink>
)

}