package com.instyte.iam.repository;

import com.instyte.iam.entity.PageInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PageInfoRepository extends JpaRepository<PageInfo, Long> {
    PageInfo findByHostName(String hostName);
}
