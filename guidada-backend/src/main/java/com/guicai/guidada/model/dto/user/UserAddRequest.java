package com.guicai.guidada.model.dto.user;

import java.io.Serializable;
import lombok.Data;

/**
 * 用户创建请求
 *
 * @author <a href="https://github.com/guicaizhici">鬼才之刺</a>
 * @author <a>中国</a>
 */
@Data
public class UserAddRequest implements Serializable {

    /**
     * 用户昵称
     */
    private String userName;

    /**
     * 账号
     */
    private String userAccount;

    /**
     * 用户头像
     */
    private String userAvatar;

    /**
     * 用户角色: user, admin
     */
    private String userRole;

    private static final long serialVersionUID = 1L;
}