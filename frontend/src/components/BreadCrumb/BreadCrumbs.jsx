import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

import "bootstrap-icons/font/bootstrap-icons.css";
import "./BreadCrumbs.css";

const Breadcrumbs = ({ productName, productCategory }) => {
    return (
        <Breadcrumb>
            {productCategory && (
                <Breadcrumb.Item active>
                    <Link to={`/category/${encodeURIComponent(productCategory)}`} className="category-name">
                        {productCategory} <i className="bi bi-chevron-right"></i>
                    </Link>
                </Breadcrumb.Item>
            )}

            {productName && (
                <Breadcrumb.Item active>
                    {productName}
                </Breadcrumb.Item>
            )}
        </Breadcrumb>
    );
};

export default Breadcrumbs;