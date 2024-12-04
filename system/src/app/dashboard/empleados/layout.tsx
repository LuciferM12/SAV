import Authorizer from '@/components/security/Authorizer'
import React from 'react'

interface LayoutProps {
    children?: React.ReactNode
}

const layout = ({ children }: LayoutProps) => {
    return (
        <div className='min-h-screen'>
            <Authorizer allowedRoles={[8]}>
            {
                children
            }
            </Authorizer>
        </div>

    )
}

export default layout